import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { categories } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — BRYT Dental Technologies" },
      { name: "description", content: "Browse dental chairs, radiology, handpieces and clinical products from BRYT Dental Technologies." },
    ],
  }),
  component: ProductsLayout,
});

function ProductsLayout() {
  const matches = useMatches();
  const isIndex = matches[matches.length - 1]?.routeId === "/products";

  return (
    <Layout>
      {isIndex ? (
        <>
          <PageHero
            eyebrow="Catalogue"
            title="Equipment Trusted by 500+ Clinics"
            subtitle="Authorised distribution across dental chairs, radiology, handpieces and clinical products — with end-to-end commissioning and after-sales support."
          />
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/products/$category"
                  params={{ category: c.slug }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40"
                >
                  <h3 className="font-display text-xl font-bold text-navy group-hover:text-primary">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
                    {c.groups.reduce((n, g) => n + g.products.length, 0)} products →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <Outlet />
      )}
    </Layout>
  );
}