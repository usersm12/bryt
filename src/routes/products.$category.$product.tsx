import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { dbGetProduct, dbGetCategory, type Category, type Product, type ProductDetails, type ProductGroup } from "@/lib/db.server";
import { ChevronRight, Check, Package, Phone, ArrowRight } from "lucide-react";

type LoaderResult = {
  category: Category;
  product: Product;
  details: ProductDetails | undefined;
};

const loadProductPage = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => d as { category: string; product: string })
  .handler(async ({ data }) => {
    const [result, category] = await Promise.all([
      dbGetProduct(data?.category ?? "", data?.product ?? ""),
      dbGetCategory(data?.category ?? ""),
    ]);
    if (!result || !category) return null;
    return { category, product: result.product, details: result.details } as LoaderResult;
  });

export const Route = createFileRoute("/products/$category/$product")({
  loader: async ({ params }): Promise<LoaderResult> => {
    let result: LoaderResult | null = null;
    if (typeof window === "undefined") {
      result = await loadProductPage({ data: { category: params.category, product: params.product } });
    } else {
      const res = await fetch(
        `/api/public/product?category=${encodeURIComponent(params.category)}&product=${encodeURIComponent(params.product)}`,
      );
      result = res.ok ? await res.json() : null;
    }
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const description = loaderData.details?.intro ?? loaderData.product.description;
    const title = `${loaderData.product.name} — ${loaderData.category.name} | BRYT Dental Technologies`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-navy">Product not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary">← Back to products</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-navy">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{(error as Error).message}</p>
    </div>
  ),
});

function ProductPage() {
  const { category, product, details } = Route.useLoaderData();
  const related = category.groups
    .find((g: ProductGroup) => g.name === product.group)
    ?.products.filter((p: Product) => p.slug !== product.slug)
    .slice(0, 4) ?? [];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-6 pt-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <Link to="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <Link to="/products/$category" params={{ category: category.slug }} className="hover:text-primary">{category.name}</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <span className="text-navy">{product.name}</span>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        <div>
          {product.brand && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{product.brand}</p>
          )}
          <h1 className="font-display text-4xl font-bold text-navy">{product.name}</h1>
          {details?.tagline && (
            <p className="mt-3 text-lg font-medium text-slate-600">{details.tagline}</p>
          )}
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {details?.intro ?? product.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products/$category"
              params={{ category: category.slug }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:border-primary/40 hover:text-primary"
            >
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to {category.name}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" /> Enquire Now
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-8">
          {product.brand ? (
            <div className="text-center">
              <Package className="mx-auto h-24 w-24 text-slate-200" />
              <p className="mt-4 font-display text-2xl font-bold text-navy">{product.name}</p>
              <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
            </div>
          ) : (
            <Package className="h-32 w-32 text-slate-200" />
          )}
        </div>
      </section>

      {/* Overview table */}
      {details?.overview && details.overview.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-navy">Product Overview</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {details.overview.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="w-1/3 px-4 py-3 font-medium text-slate-700">{row.label}</td>
                    <td className="px-4 py-3 text-slate-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Feature sections */}
      {details?.sections && details.sections.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-navy">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {details.sections.map((section) => (
              <div key={section.heading} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-navy">{section.heading}</h3>
                {section.body && <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech specs */}
      {details?.techSpecs && details.techSpecs.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-navy">Technical Specifications</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {details.techSpecs.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="w-1/3 px-4 py-3 font-medium text-slate-700">{row.label}</td>
                    <td className="px-4 py-3 text-slate-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Applications */}
      {details?.applications && details.applications.length > 0 && (
        <section className="bg-slate-50 px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 font-display text-2xl font-bold text-navy">Clinical Applications</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {details.applications.map((a) => (
                <div key={a.name} className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="font-semibold text-navy">{a.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{a.benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-navy">
            More from {product.brand ?? category.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p: Product) => (
              <Link
                key={p.slug}
                to="/products/$category/$product"
                params={{ category: category.slug, product: p.slug }}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition"
              >
                <Package className="h-8 w-8 text-slate-200 group-hover:text-primary/20 transition" />
                <div className="mt-3 font-semibold text-navy group-hover:text-primary transition">{p.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary/5 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-navy">Interested in {product.name}?</h2>
          <p className="mt-3 text-muted-foreground">
            Contact BRYT Dental Technologies for pricing, demonstrations, and installation across Gujarat and Pan-India.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" /> Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
