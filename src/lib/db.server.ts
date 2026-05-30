"use server";
import { env } from "cloudflare:workers";

import type { Category, Product, ProductDetails, ProductGroup } from "./products";

// ─── Types stored in D1 ───────────────────────────────────────────────────────

export type DbCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  sort_order: number;
};

export type DbProduct = {
  slug: string;
  name: string;
  brand: string;
  category_slug: string;
  group_name: string;
  description: string;
  tagline: string;
  intro: string;
  image_url: string;
  overview: string;
  tech_specs: string;
  sections: string;
  applications: string;
  advantages: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function db(): D1Database {
  return (env as unknown as CloudflareEnv).DB;
}

// ─── Parsing helpers ──────────────────────────────────────────────────────────

function parseJSON<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

function dbProductToProductDetails(row: DbProduct): ProductDetails | undefined {
  const sections = parseJSON<ProductDetails["sections"]>(row.sections, []);
  if (
    !row.tagline &&
    !row.intro &&
    sections.length === 0
  ) return undefined;

  return {
    tagline: row.tagline,
    intro: row.intro,
    overview: parseJSON(row.overview, []),
    techSpecs: parseJSON(row.tech_specs, []),
    sections,
    applications: parseJSON(row.applications, []),
    advantages: parseJSON(row.advantages, []),
  };
}

function dbProductToProduct(row: DbProduct): Product {
  return {
    slug: row.slug,
    name: row.name,
    brand: row.brand || undefined,
    category: row.category_slug,
    group: row.group_name || undefined,
    description: row.description,
  };
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function dbGetCategories(): Promise<Category[]> {
  const { results } = await db()
    .prepare("SELECT * FROM categories ORDER BY sort_order")
    .all<DbCategory>();

  const categories: Category[] = [];

  for (const cat of results) {
    const { results: groups } = await db()
      .prepare("SELECT * FROM product_groups WHERE category_slug = ? ORDER BY sort_order")
      .bind(cat.slug)
      .all<{ id: string; name: string; sort_order: number }>();

    const productGroups: ProductGroup[] = [];

    for (const group of groups) {
      const { results: prods } = await db()
        .prepare(
          "SELECT * FROM products WHERE category_slug = ? AND group_name = ? ORDER BY sort_order",
        )
        .bind(cat.slug, group.name)
        .all<DbProduct>();

      productGroups.push({
        name: group.name,
        products: prods.map(dbProductToProduct),
      });
    }

    categories.push({
      slug: cat.slug,
      name: cat.name,
      tagline: cat.tagline,
      description: cat.description,
      groups: productGroups,
    });
  }

  return categories;
}

export async function dbGetCategory(slug: string): Promise<Category | undefined> {
  const cat = await db()
    .prepare("SELECT * FROM categories WHERE slug = ?")
    .bind(slug)
    .first<DbCategory>();

  if (!cat) return undefined;

  const { results: groups } = await db()
    .prepare("SELECT * FROM product_groups WHERE category_slug = ? ORDER BY sort_order")
    .bind(slug)
    .all<{ id: string; name: string; sort_order: number }>();

  const productGroups: ProductGroup[] = [];

  for (const group of groups) {
    const { results: prods } = await db()
      .prepare(
        "SELECT * FROM products WHERE category_slug = ? AND group_name = ? ORDER BY sort_order",
      )
      .bind(slug, group.name)
      .all<DbProduct>();

    productGroups.push({
      name: group.name,
      products: prods.map(dbProductToProduct),
    });
  }

  return {
    slug: cat.slug,
    name: cat.name,
    tagline: cat.tagline,
    description: cat.description,
    groups: productGroups,
  };
}

export async function dbGetProduct(
  categorySlug: string,
  productSlug: string,
): Promise<{ product: Product; details: ProductDetails | undefined } | undefined> {
  const row = await db()
    .prepare("SELECT * FROM products WHERE category_slug = ? AND slug = ?")
    .bind(categorySlug, productSlug)
    .first<DbProduct>();

  if (!row) return undefined;

  return {
    product: dbProductToProduct(row),
    details: dbProductToProductDetails(row),
  };
}

// ─── Admin: Categories CRUD ───────────────────────────────────────────────────

export async function dbListCategories(): Promise<DbCategory[]> {
  const { results } = await db()
    .prepare("SELECT * FROM categories ORDER BY sort_order")
    .all<DbCategory>();
  return results;
}

export async function dbCreateCategory(data: Omit<DbCategory, "sort_order">): Promise<void> {
  const { results: existing } = await db()
    .prepare("SELECT MAX(sort_order) as max FROM categories")
    .all<{ max: number | null }>();
  const max = existing[0]?.max ?? -1;

  await db()
    .prepare(
      "INSERT INTO categories (slug, name, tagline, description, sort_order) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(data.slug, data.name, data.tagline, data.description, max + 1)
    .run();
}

export async function dbUpdateCategory(
  slug: string,
  data: Partial<Omit<DbCategory, "slug">>,
): Promise<void> {
  const fields = Object.entries(data)
    .map(([k]) => `${k} = ?`)
    .join(", ");
  const values = Object.values(data);
  await db()
    .prepare(`UPDATE categories SET ${fields} WHERE slug = ?`)
    .bind(...values, slug)
    .run();
}

export async function dbDeleteCategory(slug: string): Promise<void> {
  await db().prepare("DELETE FROM categories WHERE slug = ?").bind(slug).run();
}

// ─── Admin: Product Groups CRUD ───────────────────────────────────────────────

export async function dbListGroups(
  categorySlug: string,
): Promise<{ id: string; name: string; sort_order: number }[]> {
  const { results } = await db()
    .prepare("SELECT * FROM product_groups WHERE category_slug = ? ORDER BY sort_order")
    .bind(categorySlug)
    .all<{ id: string; name: string; sort_order: number }>();
  return results;
}

export async function dbUpsertGroup(categorySlug: string, name: string): Promise<string> {
  const existing = await db()
    .prepare("SELECT id FROM product_groups WHERE category_slug = ? AND name = ?")
    .bind(categorySlug, name)
    .first<{ id: string }>();

  if (existing) return existing.id;

  const { results: maxRows } = await db()
    .prepare("SELECT MAX(sort_order) as max FROM product_groups WHERE category_slug = ?")
    .bind(categorySlug)
    .all<{ max: number | null }>();

  const max = maxRows[0]?.max ?? -1;
  const id = `${categorySlug}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  await db()
    .prepare(
      "INSERT INTO product_groups (id, category_slug, name, sort_order) VALUES (?, ?, ?, ?)",
    )
    .bind(id, categorySlug, name, max + 1)
    .run();

  return id;
}

// ─── Admin: Products CRUD ─────────────────────────────────────────────────────

export type ProductInput = {
  slug: string;
  name: string;
  brand: string;
  category_slug: string;
  group_name: string;
  description: string;
  tagline: string;
  intro: string;
  image_url: string;
  overview: string;
  tech_specs: string;
  sections: string;
  applications: string;
  advantages: string;
};

export async function dbListProducts(categorySlug?: string): Promise<DbProduct[]> {
  if (categorySlug) {
    const { results } = await db()
      .prepare("SELECT * FROM products WHERE category_slug = ? ORDER BY group_name, sort_order")
      .bind(categorySlug)
      .all<DbProduct>();
    return results;
  }
  const { results } = await db()
    .prepare("SELECT * FROM products ORDER BY category_slug, group_name, sort_order")
    .all<DbProduct>();
  return results;
}

export async function dbGetProductBySlug(slug: string): Promise<DbProduct | undefined> {
  const row = await db()
    .prepare("SELECT * FROM products WHERE slug = ?")
    .bind(slug)
    .first<DbProduct>();
  return row ?? undefined;
}

export async function dbCreateProduct(data: ProductInput): Promise<void> {
  await dbUpsertGroup(data.category_slug, data.group_name);

  const { results: maxRows } = await db()
    .prepare("SELECT MAX(sort_order) as max FROM products WHERE category_slug = ?")
    .bind(data.category_slug)
    .all<{ max: number | null }>();
  const max = maxRows[0]?.max ?? -1;

  await db()
    .prepare(
      `INSERT INTO products
        (slug, name, brand, category_slug, group_name, description, tagline, intro,
         image_url, overview, tech_specs, sections, applications, advantages, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      data.slug,
      data.name,
      data.brand,
      data.category_slug,
      data.group_name,
      data.description,
      data.tagline,
      data.intro,
      data.image_url,
      data.overview,
      data.tech_specs,
      data.sections,
      data.applications,
      data.advantages,
      max + 1,
    )
    .run();
}

export async function dbUpdateProduct(slug: string, data: Partial<ProductInput>): Promise<void> {
  await db()
    .prepare(
      `UPDATE products SET
        name = COALESCE(?, name),
        brand = COALESCE(?, brand),
        category_slug = COALESCE(?, category_slug),
        group_name = COALESCE(?, group_name),
        description = COALESCE(?, description),
        tagline = COALESCE(?, tagline),
        intro = COALESCE(?, intro),
        image_url = COALESCE(?, image_url),
        overview = COALESCE(?, overview),
        tech_specs = COALESCE(?, tech_specs),
        sections = COALESCE(?, sections),
        applications = COALESCE(?, applications),
        advantages = COALESCE(?, advantages),
        updated_at = datetime('now')
      WHERE slug = ?`,
    )
    .bind(
      data.name ?? null,
      data.brand ?? null,
      data.category_slug ?? null,
      data.group_name ?? null,
      data.description ?? null,
      data.tagline ?? null,
      data.intro ?? null,
      data.image_url ?? null,
      data.overview ?? null,
      data.tech_specs ?? null,
      data.sections ?? null,
      data.applications ?? null,
      data.advantages ?? null,
      slug,
    )
    .run();
}

export async function dbDeleteProduct(slug: string): Promise<void> {
  await db().prepare("DELETE FROM products WHERE slug = ?").bind(slug).run();
}

// ─── Admin: Stats ─────────────────────────────────────────────────────────────

export async function dbGetStats(): Promise<{
  categories: number;
  products: number;
  withImages: number;
  withDetails: number;
}> {
  const [catRow, prodRow, imgRow, detailRow] = await Promise.all([
    db().prepare("SELECT COUNT(*) as n FROM categories").first<{ n: number }>(),
    db().prepare("SELECT COUNT(*) as n FROM products").first<{ n: number }>(),
    db()
      .prepare("SELECT COUNT(*) as n FROM products WHERE image_url != ''")
      .first<{ n: number }>(),
    db()
      .prepare("SELECT COUNT(*) as n FROM products WHERE tagline != ''")
      .first<{ n: number }>(),
  ]);
  return {
    categories: catRow?.n ?? 0,
    products: prodRow?.n ?? 0,
    withImages: imgRow?.n ?? 0,
    withDetails: detailRow?.n ?? 0,
  };
}
