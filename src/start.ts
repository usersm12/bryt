import { createStart, createMiddleware } from "@tanstack/react-start";
import { renderErrorPage } from "./lib/error-page";
import { validateDbSession } from "./lib/auth.server";

const SESSION_COOKIE = "bryt_admin";

// Auth middleware runs inside the h3 request context — getCookie() works here.
// We cannot use getCookie() inside createServerFn during SSR because getServerFnById
// uses dynamic imports that lose the AsyncLocalStorage context.
const authMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const { getCookie } = await import("@tanstack/react-start/server");
    const token = getCookie(SESSION_COOKIE);
    console.log("[auth] cookie token:", token ? token.slice(0, 8) + "..." : "MISSING");
    const isAuthed = token ? await validateDbSession(token) : false;
    console.log("[auth] isAuthed:", isAuthed);
    return next({ context: { isAuthed } });
  } catch (err) {
    console.error("[auth] middleware error:", err);
    return next({ context: { isAuthed: false } });
  }
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [authMiddleware, errorMiddleware],
}));
