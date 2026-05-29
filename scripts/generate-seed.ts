/**
 * Run: bun scripts/generate-seed.ts > seed.sql
 * Then: wrangler d1 execute bryt-products --file=seed.sql --remote
 */
import { categories, type Category, type ProductGroup } from "../src/lib/products";
import { productDetails } from "../src/lib/products-seed-export";

function escape(s: string | undefined | null): string {
  return (s ?? "").replace(/'/g, "''");
}

const lines: string[] = [
  "-- Auto-generated seed from products.ts",
  "-- Run: wrangler d1 execute bryt-products --file=seed.sql --remote",
  "",
  "DELETE FROM products;",
  "DELETE FROM product_groups;",
  "DELETE FROM categories;",
  "",
];

categories.forEach((cat: Category, ci: number) => {
  lines.push(
    `INSERT INTO categories (slug, name, tagline, description, sort_order) VALUES ('${escape(cat.slug)}', '${escape(cat.name)}', '${escape(cat.tagline)}', '${escape(cat.description)}', ${ci});`,
  );
});

lines.push("");

categories.forEach((cat: Category) => {
  cat.groups.forEach((group: ProductGroup, gi: number) => {
    const id = `${cat.slug}-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    lines.push(
      `INSERT INTO product_groups (id, category_slug, name, sort_order) VALUES ('${escape(id)}', '${escape(cat.slug)}', '${escape(group.name)}', ${gi});`,
    );
  });
});

lines.push("");

let productOrder = 0;
categories.forEach((cat: Category) => {
  cat.groups.forEach((group: ProductGroup) => {
    group.products.forEach((p) => {
      const details = productDetails[p.slug];
      const overview = JSON.stringify(details?.overview ?? []);
      const techSpecs = JSON.stringify(details?.techSpecs ?? []);
      const sections = JSON.stringify(details?.sections ?? []);
      const applications = JSON.stringify(details?.applications ?? []);
      const advantages = JSON.stringify(details?.advantages ?? []);

      lines.push(
        `INSERT INTO products (slug, name, brand, category_slug, group_name, description, tagline, intro, image_url, overview, tech_specs, sections, applications, advantages, sort_order) VALUES (` +
          `'${escape(p.slug)}', ` +
          `'${escape(p.name)}', ` +
          `'${escape(p.brand ?? "")}', ` +
          `'${escape(cat.slug)}', ` +
          `'${escape(group.name)}', ` +
          `'${escape(p.description)}', ` +
          `'${escape(details?.tagline ?? "")}', ` +
          `'${escape(details?.intro ?? "")}', ` +
          `'', ` +
          `'${escape(overview)}', ` +
          `'${escape(techSpecs)}', ` +
          `'${escape(sections)}', ` +
          `'${escape(applications)}', ` +
          `'${escape(advantages)}', ` +
          `${productOrder++}` +
          `);`,
      );
    });
  });
});

console.log(lines.join("\n"));
