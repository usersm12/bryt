import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, getCategory, getProductDetails, type Category, type Product, type ProductGroup } from "@/lib/products";
import { ChevronRight, Check, Package, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }): { category: Category; product: Product } => {
    const category = getCategory(params.category);
    const product = getProduct(params.category, params.product);
    if (!category || !product) throw notFound();
    return { category, product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const details = getProductDetails(loaderData.product.slug);
    const description = details?.intro ?? loaderData.product.description;
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
        <>
          {/* Product Overview Table */}
          {details.overview && (
            <section className="mx-auto max-w-7xl px-6 pb-10">
              <h2 className="mb-4 font-display text-2xl font-bold text-navy">Product Overview</h2>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {details.overview.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
                        <td className="w-1/3 px-5 py-3 font-semibold text-navy">{row.label}</td>
                        <td className="px-5 py-3 text-foreground/80">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Technical Specifications Table */}
          {details.techSpecs && (
            <section className="mx-auto max-w-7xl px-6 pb-10">
              <h2 className="mb-4 font-display text-2xl font-bold text-navy">Technical Specifications</h2>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {details.techSpecs.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
                        <td className="w-1/3 px-5 py-3 font-semibold text-navy">{row.label}</td>
                        <td className="px-5 py-3 font-mono text-foreground/80">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Key Features Sections */}
          <section className="mx-auto max-w-7xl px-6 pb-10">
            <h2 className="mb-6 font-display text-2xl font-bold text-navy">Key Features</h2>
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
                  {s.specs && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-border">
                      <table className="w-full text-xs">
                        <tbody>
                          {s.specs.map((spec, i) => (
                            <tr key={spec.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                              <td className="px-3 py-2 font-semibold text-navy">{spec.label}</td>
                              <td className="px-3 py-2 text-foreground/75">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Clinical Applications */}
          {details.applications && (
            <section className="mx-auto max-w-7xl px-6 pb-10">
              <h2 className="mb-4 font-display text-2xl font-bold text-navy">Clinical Applications</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {details.applications.map((app) => (
                  <div key={app.name} className="rounded-xl border border-border bg-card p-5">
                    <p className="font-semibold text-navy">{app.name}</p>
                    <p className="mt-1 text-sm text-foreground/70">{app.benefit}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Advantages */}
          {details.advantages && (
            <section className="mx-auto max-w-7xl px-6 pb-10">
              <h2 className="mb-4 font-display text-2xl font-bold text-navy">Key Advantages at a Glance</h2>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="px-5 py-3 text-left font-semibold text-navy">Feature</th>
                      <th className="px-5 py-3 text-left font-semibold text-navy">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.advantages.map((adv, i) => (
                      <tr key={adv.feature} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
                        <td className="px-5 py-3 font-semibold text-navy">{adv.feature}</td>
                        <td className="px-5 py-3 text-foreground/80">{adv.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-gradient-hero px-8 py-10 text-center shadow-card">
          <h2 className="font-display text-2xl font-bold text-navy">Ready to equip your clinic?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-foreground/70">
            Get a quote, check availability, or speak with our team about installation and after-sales support across Gujarat and Pan-India.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-sea px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              <Phone className="h-4 w-4" /> Get a Quote
            </Link>
            <Link to="/products/$category" params={{ category: category.slug }} className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold text-navy hover:border-primary/40 hover:text-primary">
              More {category.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products */}
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
