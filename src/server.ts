import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  checkAdminPassword, createDbSession, deleteDbSession, validateDbSession,
} from "./lib/auth.server";
import {
  dbGetProductBySlug, dbListProducts, dbCreateProduct, dbUpdateProduct, dbDeleteProduct,
  dbListCategories, dbListGroups, dbGetStats, dbCreateCategory, dbUpdateCategory, dbDeleteCategory,
  type ProductInput,
} from "./lib/db.server";

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
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
  });
}

// ─── Auth endpoints ───────────────────────────────────────────────────────────

async function handleLogin(request: Request): Promise<Response> {
  try {
    const { password } = await request.json() as { password: string };
    if (!checkAdminPassword(password)) return json({ ok: false, error: "Incorrect password" });
    const token = await createDbSession();
    return json({ ok: true, token });
  } catch (err) {
    console.error("[/api/login]", err);
    return json({ ok: false, error: "Server error." }, 500);
  }
}

async function handleLogout(request: Request): Promise<Response> {
  try {
    const { token } = await request.json() as { token: string };
    if (token) await deleteDbSession(token);
    return json({ ok: true });
  } catch { return json({ ok: true }); }
}

async function handleAuthCheck(request: Request): Promise<Response> {
  try {
    const { token } = await request.json() as { token: string };
    const valid = token ? await validateDbSession(token) : false;
    return json({ ok: true, valid });
  } catch { return json({ ok: false, valid: false }); }
}

// ─── Product endpoints ────────────────────────────────────────────────────────

async function handleGetProduct(url: URL): Promise<Response> {
  try {
    const id = url.searchParams.get("id") ?? "";
    if (id === "new") {
      const categories = await dbListCategories();
      return json({ product: null, categories });
    }
    const [product, categories] = await Promise.all([
      dbGetProductBySlug(id),
      dbListCategories(),
    ]);
    return json({ product: product ?? null, categories });
  } catch (err) {
    console.error("[/api/product GET]", err);
    return json({ error: "Failed to load product" }, 500);
  }
}

async function handleListProducts(url: URL): Promise<Response> {
  try {
    const category = url.searchParams.get("category") ?? undefined;
    const products = await dbListProducts(category);
    return json(products);
  } catch (err) {
    console.error("[/api/products GET]", err);
    return json({ error: "Failed to load products" }, 500);
  }
}

async function handleSaveProduct(request: Request): Promise<Response> {
  try {
    const body = await request.json() as {
      isNew: boolean;
      originalSlug?: string;
      data: ProductInput;
    };
    if (body.isNew) {
      await dbCreateProduct(body.data);
    } else {
      await dbUpdateProduct(body.originalSlug!, body.data);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[/api/product POST]", err);
    return json({ ok: false, error: String(err) }, 500);
  }
}

async function handleDeleteProduct(request: Request): Promise<Response> {
  try {
    const { slug } = await request.json() as { slug: string };
    await dbDeleteProduct(slug);
    return json({ ok: true });
  } catch (err) {
    console.error("[/api/product DELETE]", err);
    return json({ ok: false, error: String(err) }, 500);
  }
}

async function handleGetGroups(url: URL): Promise<Response> {
  try {
    const categorySlug = url.searchParams.get("categorySlug") ?? "";
    const groups = await dbListGroups(categorySlug);
    return json(groups);
  } catch (err) {
    console.error("[/api/groups GET]", err);
    return json([], 500);
  }
}

// ─── Category endpoints ───────────────────────────────────────────────────────

async function handleListCategories(): Promise<Response> {
  try {
    const cats = await dbListCategories();
    return json(cats);
  } catch (err) {
    console.error("[/api/categories GET]", err);
    return json([], 500);
  }
}

async function handleCreateCategory(request: Request): Promise<Response> {
  try {
    const data = await request.json() as Parameters<typeof dbCreateCategory>[0];
    await dbCreateCategory(data);
    return json({ ok: true });
  } catch (err) { return json({ ok: false, error: String(err) }, 500); }
}

async function handleUpdateCategory(request: Request): Promise<Response> {
  try {
    const { slug, data } = await request.json() as { slug: string; data: Parameters<typeof dbUpdateCategory>[1] };
    await dbUpdateCategory(slug, data);
    return json({ ok: true });
  } catch (err) { return json({ ok: false, error: String(err) }, 500); }
}

async function handleDeleteCategory(request: Request): Promise<Response> {
  try {
    const { slug } = await request.json() as { slug: string };
    await dbDeleteCategory(slug);
    return json({ ok: true });
  } catch (err) { return json({ ok: false, error: String(err) }, 500); }
}

async function handleGetStats(): Promise<Response> {
  try {
    const stats = await dbGetStats();
    return json(stats);
  } catch (err) {
    console.error("[/api/stats GET]", err);
    return json({ categories: 0, products: 0, withImages: 0, withDetails: 0 }, 500);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try { payload = JSON.parse(body); } catch { return false; }
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
  const ssrError = consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error("[SSR ERROR]", ssrError);
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const p = url.pathname;
    const m = request.method;

    // Raw API — plain JSON, no TanStack Start serialisation
    if (m === "POST") {
      if (p === "/api/login")            return handleLogin(request);
      if (p === "/api/logout")           return handleLogout(request);
      if (p === "/api/auth")             return handleAuthCheck(request);
      if (p === "/api/product/save")     return handleSaveProduct(request);
      if (p === "/api/product/delete")   return handleDeleteProduct(request);
      if (p === "/api/category/create")  return handleCreateCategory(request);
      if (p === "/api/category/update")  return handleUpdateCategory(request);
      if (p === "/api/category/delete")  return handleDeleteCategory(request);
    }
    if (m === "GET") {
      if (p === "/api/product")    return handleGetProduct(url);
      if (p === "/api/products")   return handleListProducts(url);
      if (p === "/api/groups")     return handleGetGroups(url);
      if (p === "/api/categories") return handleListCategories();
      if (p === "/api/stats")      return handleGetStats();
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
