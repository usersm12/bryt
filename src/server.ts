import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { checkAdminPassword, createDbSession, deleteDbSession, validateDbSession } from "./lib/auth.server";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// ─── Raw auth endpoints (bypass TanStack Start serialisation) ─────────────────

async function handleLogin(request: Request): Promise<Response> {
  try {
    const { password } = await request.json() as { password: string };
    if (!checkAdminPassword(password)) {
      return json({ ok: false, error: "Incorrect password" });
    }
    const token = await createDbSession();
    return json({ ok: true, token });
  } catch (err) {
    console.error("[/api/login]", err);
    return json({ ok: false, error: "Server error. Please try again." }, 500);
  }
}

async function handleLogout(request: Request): Promise<Response> {
  try {
    const { token } = await request.json() as { token: string };
    if (token) await deleteDbSession(token);
    return json({ ok: true });
  } catch {
    return json({ ok: true });
  }
}

async function handleAuthCheck(request: Request): Promise<Response> {
  try {
    const { token } = await request.json() as { token: string };
    const valid = token ? await validateDbSession(token) : false;
    return json({ ok: true, valid });
  } catch {
    return json({ ok: false, valid: false });
  }
}

// ─────────────────────────────────────────────────────────────────────────────

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") return false;
  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) return false;
  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) return response;
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // Raw API routes — no TanStack Start serialisation involved
    if (request.method === "POST") {
      if (url.pathname === "/api/login")  return handleLogin(request);
      if (url.pathname === "/api/logout") return handleLogout(request);
      if (url.pathname === "/api/auth")   return handleAuthCheck(request);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
