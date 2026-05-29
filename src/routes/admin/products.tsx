import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { dbListProducts, dbDeleteProduct, type DbProduct } from "@/lib/db.server";
import { Plus, Pencil, Trash2, Search, Image } from "lucide-react";

const listProducts = createServerFn({ method: "GET" })
  .validator((d: unknown) => d as { category?: string })
  .handler(({ data }) => dbListProducts(data.category));

const deleteProduct = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { slug: string })
  .handler(({ data }) => dbDeleteProduct(data.slug));

export const Route = createFileRoute("/admin/products")({
  loader: () => listProducts({ data: {} }),
  component: ProductsPage,
});

function ProductsPage() {
  const products = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const router = useRouter();

  const categories = [...new Set(products.map((p) => p.category_slug))].sort();

  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.group_name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || p.category_slug === filterCat;
    return matchSearch && matchCat;
  });

  async function handleDelete(p: DbProduct) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await deleteProduct({ data: { slug: p.slug } });
    router.invalidate();
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-navy">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            {filtered.length} of {products.length} products
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">
                Category / Group
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">
                Details
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-400">
                  No products found
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.slug} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Image className="h-4 w-4 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-navy">{p.name}</div>
                      {p.brand && (
                        <div className="text-xs text-slate-400">{p.brand}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="text-xs font-medium text-slate-700">{p.category_slug}</div>
                  <div className="text-xs text-slate-400">{p.group_name}</div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex gap-1.5 flex-wrap">
                    {p.tagline && (
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                        Rich details
                      </span>
                    )}
                    {p.image_url && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                        Image
                      </span>
                    )}
                    {!p.tagline && !p.image_url && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">
                        Basic
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to="/admin/products/$id"
                      params={{ id: p.slug }}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
