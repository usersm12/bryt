"use server";
import { env } from "cloudflare:workers";

const SESSION_DAYS = 360; // 360-day sessions

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
  // Store as Unix epoch seconds — avoids ISO vs SQLite datetime format mismatches
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 3600;
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
  try {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const row = await db()
      .prepare("SELECT token FROM admin_sessions WHERE token = ? AND expires_at > ?")
      .bind(token, nowSeconds)
      .first<{ token: string }>();
    return !!row;
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: string): boolean {
  const adminPw = (env as unknown as CloudflareEnv).ADMIN_PASSWORD;
  if (!adminPw) return false;
  return password === adminPw;
}
