import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { brands, allProducts } from "@/lib/products";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands — BRYT Dental Technologies" },
      { name: "description", content: "Authorised distribution for Lifedent, Acteon, Vatech, Biodent, Eighteeth, Galaxy, Tealth, BDC, Woodpecker, Gigaa, Diplomat and BRYT." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Brands"
        title="Authorised Distribution Partners"
        subtitle="We partner only with manufacturers that stand behind their equipment with parts, service and long-term reliability."
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => {
            const count = allProducts.filter((p) => p.brand?.toUpperCase() === b).length;
            return (
              <div key={b} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-navy">{b}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{count} products</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Authorised distribution with full installation, training and after-sales support.
                </p>
                <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-primary">Browse catalogue →</Link>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}