"use server";
import { env } from "cloudflare:workers";

const SESSION_COOKIE = "bryt_admin";
const SESSION_HOURS = 24;

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function db() {
  return (env as unknown as CloudflareEnv).DB;
}

// Lazy-load vinxi/http so the client bundler never tries to resolve it.
// The Worker build bundles it fine; the client build never sees the import.
async function cookies() {
  const mod = await import(/* @vite-ignore */ "vinxi/http");
  return {
    getCookie: mod.getCookie as (name: string) => string | undefined,
    setCookie: mod.setCookie as (name: string, value: string, opts?: object) => void,
    deleteCookie: mod.deleteCookie as (name: string, opts?: object) => void,
  };
}

export async function createAdminSession(): Promise<string> {
  const { setCookie } = await cookies();
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();
  await db()
    .prepare("INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)")
    .bind(token, expiresAt)
    .run();
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  const { getCookie, deleteCookie } = await cookies();
  const token = getCookie(SESSION_COOKIE);
  if (token) {
    await db().prepare("DELETE FROM admin_sessions WHERE token = ?").bind(token).run();
  }
  deleteCookie(SESSION_COOKIE, { path: "/" });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const { getCookie } = await cookies();
  const token = getCookie(SESSION_COOKIE);
  if (!token) return false;
  const row = await db()
    .prepare(
      "SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')",
    )
    .bind(token)
    .first<{ token: string }>();
  return !!row;
}

export function checkAdminPassword(password: string): boolean {
  const adminPw = (env as unknown as CloudflareEnv).ADMIN_PASSWORD;
  if (!adminPw) return false;
  return password === adminPw;
}
