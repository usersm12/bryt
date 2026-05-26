import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, getCategory, getProductDetails, type Category, type Product, type ProductGroup } from "@/lib/products";
import { ChevronRight, Check, Package, Phone } from "lucide-react";

export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }): { category: Category; product: Product } => {
    const category = getCategory(params.category);
    const product = getProduct(params.category, params.product);
    if (!category || !product) throw notFound();
    return { category, product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ${loaderData.category.name} | BRYT Dental` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — BRYT Dental Technologies` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [],
  }),
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
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ProductPage() {
  const { category, product } = Route.useLoaderData();
  const details = getProductDetails(product.slug);
  const related = category.groups
    .find((g: ProductGroup) => g.name === product.group)
    ?.products.filter((p: Product) => p.slug !== product.slug)
    .slice(0, 4) ?? [];

  return (
    <>
      <nav className="mx-auto max-w-7xl px-6 pt-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <Link to="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <Link to="/products/$category" params={{ category: category.slug }} className="hover:text-primary">{category.name}</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <span className="text-navy">{product.name}</span>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="grid aspect-square place-items-center rounded-2xl bg-gradient-hero shadow-card">
          <Package className="h-32 w-32 text-primary/40" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{product.brand} · {category.name}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy md:text-4xl">{product.name}</h1>
          {details ? (
            <>
              <p className="mt-2 font-display text-lg font-semibold text-primary">{details.tagline}</p>
              <p className="mt-4 text-base text-foreground/75">{details.intro}</p>
            </>
          ) : (
            <p className="mt-4 text-base text-foreground/75">{product.description}</p>
          )}

          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Authorised distribution with original warranty",
              "On-site installation and commissioning",
              "Operator training included",
              "Pan-India service network",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-sea px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              <Phone className="h-4 w-4" /> Enquire / Get Quote
            </Link>
            <Link to="/products/$category" params={{ category: category.slug }} className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-navy hover:border-primary/40 hover:text-primary">
              View all {category.name}
            </Link>
          </div>
        </div>
      </section>

      {details && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-navy">Everything About the Product</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {details.sections.map((s) => (
              <div key={s.heading} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-navy">{s.heading}</h3>
                {s.body && <p className="mt-2 text-sm text-foreground/75">{s.body}</p>}
                {s.bullets && (
                  <ul className="mt-4 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="mb-5 font-display text-xl font-bold text-navy">More from {product.group}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p: Product) => (
              <Link
                key={p.slug}
                to="/products/$category/$product"
                params={{ category: category.slug, product: p.slug }}
                className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
              >
                <div className="grid h-28 place-items-center rounded-lg bg-gradient-hero">
                  <Package className="h-8 w-8 text-primary/60" />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-navy group-hover:text-primary">{p.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}