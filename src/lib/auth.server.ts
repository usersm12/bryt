"use server";
import { env } from "cloudflare:workers";

// Only DB operations here — no cookie imports.
// Cookie read/write happens inside createServerFn handlers in the route files
// (server-bundle only), so they can safely use @tanstack/react-start/server there.

const SESSION_HOURS = 24;

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function db() {
  return (env as unknown as CloudflareEnv).DB;
}

export async function createDbSession(): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();
  await db()
    .prepare("INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)")
    .bind(token, expiresAt)
    .run();
  return token;
}

export async function deleteDbSession(token: string): Promise<void> {
  await db().prepare("DELETE FROM admin_sessions WHERE token = ?").bind(token).run();
}

export async function validateDbSession(token: string): Promise<boolean> {
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
