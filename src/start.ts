import { createStart, createMiddleware } from "@tanstack/react-start";
import { renderErrorPage } from "./lib/error-page";
import { validateDbSession } from "./lib/auth.server";

const SESSION_COOKIE = "bryt_admin";
const LOGIN_PATH = "/admin/login";
const ADMIN_PREFIX = "/admin";

// Auth middleware runs inside the h3 request context — getCookie() works here.
// We also redirect unauthenticated /admin requests directly from the middleware,
// since beforeLoad cannot reliably access cookies server-side.
const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const url = new URL(request.url);
    const isAdminRoute = url.pathname.startsWith(ADMIN_PREFIX) && url.pathname !== LOGIN_PATH;
    const isApiRoute = url.pathname.startsWith("/api/");

    // Skip auth for non-admin routes and API endpoints
    if (!isAdminRoute || isApiRoute) {
      return next({ context: { isAuthed: false } });
    }

    const { getCookie } = await import("@tanstack/react-start/server");
    const token = getCookie(SESSION_COOKIE);
    const isAuthed = token ? await validateDbSession(token) : false;

    if (!isAuthed) {
      return new Response(null, {
        status: 302,
        headers: { Location: LOGIN_PATH },
      });
    }

    return next({ context: { isAuthed: true } });
  } catch (err) {
    console.error("[authMiddleware error]", err);
    // On unexpected error, let the request through so it doesn't infinite-loop
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
    console.error("[errorMiddleware]", error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [authMiddleware, errorMiddleware],
}));
