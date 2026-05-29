/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  R2: R2Bucket;
  ADMIN_PASSWORD: string;
}

declare module "cloudflare:workers" {
  export const env: CloudflareEnv;
}
