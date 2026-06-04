import { createFileRoute, Link, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { dbGetCategory, type Category, type ProductGroup, type Product } from "@/lib/db.server";
import { ChevronRight, ArrowRight } from "lucide-react";

const loadCategory = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => d as { slug: string })
  .handler(({ data }) => dbGetCategory(data?.slug ?? ""));

export const Route = createFileRoute("/products/$category")({
  loader: async ({ params }) => {
    let category: Category | undefined;
    if (typeof window === "undefined") {
      category = await loadCategory({ data: { slug: params.category } });
    } else {
      const res = await fetch(`/api/public/category?slug=${encodeURIComponent(params.category)}`);
      category = res.ok ? await res.json() : undefined;
    }
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
      <Link to="/products" className="mt-4 inline-block text-primary">← All products</Link>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const matches = useMatches();
  const isProductPage = matches[matches.length - 1]?.routeId === "/products/$category/$product";

  if (isProductPage) return <Outlet />;

  const totalProducts = category.groups.reduce((n: number, g: ProductGroup) => n + g.products.length, 0);

  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 via-sea/5 to-background px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-navy font-medium">{category.name}</span>
          </nav>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Category</p>
              <h1 className="font-display text-4xl font-bold text-navy md:text-5xl">{category.name}</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
            </div>
            <div className="shrink-0 rounded-2xl border border-primary/20 bg-white px-6 py-4 text-center shadow-sm">
              <div className="font-display text-3xl font-bold text-primary">{totalProducts}</div>
              <div className="text-xs text-muted-foreground">products</div>
            </div>
          </div>
        </div>
      </div>

      {/* Products by brand */}
      <div className="mx-auto max-w-7xl px-6 py-14 space-y-16">
        {category.groups.map((group: ProductGroup) => (
          <section key={group.name}>
            {/* Brand header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 rounded-full bg-gradient-to-b from-primary to-sea" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">{group.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{group.products.length} products</p>
                </div>
              </div>
            </div>

            {/* Product cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.products.map((p: Product) => (
                <Link
                  key={p.slug}
                  to="/products/$category/$product"
                  params={{ category: category.slug, product: p.slug }}
                  className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
                >
                  {/* Image area */}
                  <div className="relative h-44 bg-gradient-to-br from-primary/8 via-sea/10 to-primary/5 flex items-center justify-center">
                    {p.brand && (
                      <div className="absolute top-3 left-3 rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                        {p.brand}
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-60 transition">
                      <svg className="h-14 w-14 text-primary" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
                        <path d="M3 7l9 6 9-6"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-semibold text-navy group-hover:text-primary transition leading-snug">
                      {p.name}
                    </h3>
                    {p.description && (
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                      View details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-sea px-6 py-14 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold">Need help choosing the right {category.name.toLowerCase()}?</h2>
          <p className="mt-3 text-white/80">Our team guides you through selection, installation and after-sales support across Gujarat and Pan-India.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary shadow hover:bg-white/90 transition"
          >
            Talk to an Expert <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
