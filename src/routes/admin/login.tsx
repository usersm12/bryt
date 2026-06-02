import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  checkAdminPassword,
  createDbSession,
  deleteDbSession,
  validateDbSession,
} from "@/lib/auth.server";

const SESSION_COOKIE = "bryt_admin";
const SESSION_HOURS = 24;

const loginFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string })
  .handler(async ({ data }) => {
    if (!checkAdminPassword(data.password)) {
      return { ok: false as const, error: "Incorrect password" };
    }
    const token = await createDbSession();
    // Dynamic import keeps @tanstack/react-start/server out of the client bundle
    const { setCookie } = await import("@tanstack/react-start/server");
    setCookie(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_HOURS * 3600,
    });
    return { ok: true as const };
  });

const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const { getCookie, deleteCookie } = await import("@tanstack/react-start/server");
  const token = getCookie(SESSION_COOKIE);
  if (token) await deleteDbSession(token);
  deleteCookie(SESSION_COOKIE, { path: "/" });
  return { ok: true };
});

const checkAuthFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getCookie } = await import("@tanstack/react-start/server");
  const token = getCookie(SESSION_COOKIE);
  if (!token) return false;
  return validateDbSession(token);
});

export const Route = createFileRoute("/admin/login")({
  loader: async () => {
    const authed = await checkAuthFn();
    if (authed) throw redirect({ to: "/admin" });
    return {};
  },
  component: LoginPage,
});

function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginFn({ data: { password } });
      if (result.ok) {
        window.location.href = "/admin";
      } else {
        setError(result.error);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-display text-2xl font-bold text-navy">BRYT Admin</div>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage products</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Set{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">ADMIN_PASSWORD</code> in
          your Cloudflare Workers secrets.
        </p>
      </div>
    </div>
  );
}

export { logoutFn, checkAuthFn };
