-- Run: wrangler d1 execute bryt-products --file=schema.sql --remote

CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS product_groups (
  id TEXT PRIMARY KEY,
  category_slug TEXT NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT DEFAULT '',
  category_slug TEXT NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
  group_name TEXT DEFAULT '',
  description TEXT DEFAULT '',
  tagline TEXT DEFAULT '',
  intro TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  overview TEXT DEFAULT '[]',
  tech_specs TEXT DEFAULT '[]',
  sections TEXT DEFAULT '[]',
  applications TEXT DEFAULT '[]',
  advantages TEXT DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_group ON products(category_slug, group_name);
CREATE INDEX IF NOT EXISTS idx_groups_category ON product_groups(category_slug);
