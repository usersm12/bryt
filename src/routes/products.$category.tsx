import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { getCategory, type Category } from "@/lib/products";
import { ChevronRight, Package } from "lucide-react";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }): { category: Category } => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — BRYT Dental Technologies` },
          { name: "description", content: loaderData.category.description },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-navy">Category not found</h1>
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

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Category" title={category.name} subtitle={category.description} />
      <nav className="mx-auto max-w-7xl px-6 pt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <Link to="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="mx-1 inline h-3 w-3" />
        <span className="text-navy">{category.name}</span>
      </nav>
      <section className="mx-auto max-w-7xl px-6 py-12">
        {category.groups.map((group) => (
          <div key={group.name} className="mb-12">
            <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
              <h2 className="font-display text-2xl font-bold text-navy">{group.name}</h2>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{group.products.length} items</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.products.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/$category/$product"
                  params={{ category: category.slug, product: p.slug }}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
                >
                  <div className="grid h-32 place-items-center rounded-lg bg-gradient-hero">
                    <Package className="h-10 w-10 text-primary/60" />
                  </div>
                  <div className="mt-4 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{group.name}</p>
                    <h3 className="mt-1 font-display text-base font-semibold text-navy group-hover:text-primary">{p.name}</h3>
                  </div>
                  <span className="mt-3 text-xs font-semibold text-primary">View details →</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}