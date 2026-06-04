/**
 * Hono API router — handles all /api/* admin endpoints.
 * Plain JSON in/out, no TanStack Start serialisation involved.
 * https://hono.dev  (Cloudflare Workers first-class support)
 */
import { Hono } from "hono";
import { env } from "cloudflare:workers";
import {
  checkAdminPassword, createDbSession, deleteDbSession, validateDbSession,
} from "./auth.server";
import {
  dbGetProductBySlug, dbListProducts, dbCreateProduct, dbUpdateProduct, dbDeleteProduct,
  dbListCategories, dbListGroups, dbGetStats, dbCreateCategory, dbUpdateCategory, dbDeleteCategory,
  type ProductInput,
} from "./db.server";

// Hono uses generic bindings — we cast to our env type where needed
export const api = new Hono();

// Global error handler — logs actual error and returns JSON
api.onError((err, c) => {
  console.error("[Hono API error]", err.message, err.stack);
  return c.json({ ok: false, error: err.message }, 500);
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

api.post("/api/login", async (c) => {
  const { password } = await c.req.json<{ password: string }>();
  if (!checkAdminPassword(password)) return c.json({ ok: false, error: "Incorrect password" });
  const token = await createDbSession();
  return c.json({ ok: true, token });
});

api.post("/api/logout", async (c) => {
  const { token } = await c.req.json<{ token: string }>();
  if (token) await deleteDbSession(token);
  return c.json({ ok: true });
});

api.post("/api/auth", async (c) => {
  const { token } = await c.req.json<{ token: string }>();
  const valid = token ? await validateDbSession(token) : false;
  return c.json({ ok: true, valid });
});

// ─── Products ─────────────────────────────────────────────────────────────────

api.get("/api/products", async (c) => {
  const category = c.req.query("category") ?? undefined;
  const products = await dbListProducts(category);
  return c.json(products);
});

api.get("/api/product", async (c) => {
  const id = c.req.query("id") ?? "";
  if (id === "new") {
    const categories = await dbListCategories();
    return c.json({ product: null, categories });
  }
  const [product, categories] = await Promise.all([
    dbGetProductBySlug(id),
    dbListCategories(),
  ]);
  return c.json({ product: product ?? null, categories });
});

api.post("/api/product/save", async (c) => {
  const body = await c.req.json<{ isNew: boolean; originalSlug?: string; data: ProductInput }>();
  if (body.isNew) {
    await dbCreateProduct(body.data);
  } else {
    await dbUpdateProduct(body.originalSlug!, body.data);
  }
  return c.json({ ok: true });
});

api.post("/api/product/delete", async (c) => {
  const { slug } = await c.req.json<{ slug: string }>();
  await dbDeleteProduct(slug);
  return c.json({ ok: true });
});

api.get("/api/groups", async (c) => {
  const categorySlug = c.req.query("categorySlug") ?? "";
  const groups = await dbListGroups(categorySlug);
  return c.json(groups);
});

// ─── Categories ───────────────────────────────────────────────────────────────

api.get("/api/categories", async (c) => {
  const cats = await dbListCategories();
  return c.json(cats);
});

api.post("/api/category/create", async (c) => {
  const data = await c.req.json<Parameters<typeof dbCreateCategory>[0]>();
  await dbCreateCategory(data);
  return c.json({ ok: true });
});

api.post("/api/category/update", async (c) => {
  const { slug, data } = await c.req.json<{ slug: string; data: Parameters<typeof dbUpdateCategory>[1] }>();
  await dbUpdateCategory(slug, data);
  return c.json({ ok: true });
});

api.post("/api/category/delete", async (c) => {
  const { slug } = await c.req.json<{ slug: string }>();
  await dbDeleteCategory(slug);
  return c.json({ ok: true });
});

// ─── Dashboard ────────────────────────────────────────────────────────────────

api.get("/api/stats", async (c) => {
  const stats = await dbGetStats();
  return c.json(stats);
});

// ─── Public site data (reads from D1, used by /products/* pages) ─────────────

import { dbGetCategories, dbGetCategory, dbGetProduct } from "./db.server";

api.get("/api/public/categories", async (c) => {
  const cats = await dbGetCategories();
  return c.json(cats);
});

api.get("/api/public/category", async (c) => {
  const slug = c.req.query("slug") ?? "";
  const cat = await dbGetCategory(slug);
  return cat ? c.json(cat) : c.json(null, 404);
});

api.get("/api/public/product", async (c) => {
  const categorySlug = c.req.query("category") ?? "";
  const productSlug = c.req.query("product") ?? "";
  const [result, category] = await Promise.all([
    dbGetProduct(categorySlug, productSlug),
    dbGetCategory(categorySlug),
  ]);
  if (!result || !category) return c.json(null, 404);
  return c.json({ category, product: result.product, details: result.details });
});
