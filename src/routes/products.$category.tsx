import { createFileRoute, Link, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { dbGetCategory, type Category, type ProductGroup, type Product } from "@/lib/db.server";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";

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

// Detect and hide boilerplate auto-generated descriptions
function isBoilerplate(desc: string): boolean {
  return !desc || desc.includes("supplied, installed and serviced by BRYT");
}

// Pick a subtle gradient per brand for visual variety
const brandColors: Record<string, string> = {
  LIFEDENT:   "from-blue-50 to-sky-100",
  BIODENT:    "from-teal-50 to-cyan-100",
  DIPLOMAT:   "from-indigo-50 to-blue-100",
  BRYT:       "from-sky-50 to-blue-100",
  ACTEON:     "from-violet-50 to-purple-100",
  VATECH:     "from-emerald-50 to-teal-100",
  EIGHTEETH:  "from-orange-50 to-amber-100",
  FIN:        "from-rose-50 to-pink-100",
  BDC:        "from-blue-50 to-indigo-100",
  GALAXY:     "from-cyan-50 to-sky-100",
  default:    "from-slate-50 to-blue-50",
};

function getBrandGradient(brand: string): string {
  return brandColors[brand?.toUpperCase()] ?? brandColors.default;
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const matches = useMatches();
  const isProductPage = matches[matches.length - 1]?.routeId === "/products/$category/$product";

  if (isProductPage) return <Outlet />;

  const totalProducts = category.groups.reduce((n: number, g: ProductGroup) => n + g.products.length, 0);

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] to-[#1a4a6e] px-6 py-16 text-white">
        {/* subtle grid decoration */}
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-white/60">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-white transition">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                Category
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{category.name}</h1>
              <p className="mt-4 text-lg text-white/75">{category.description}</p>
            </div>
            <div className="shrink-0">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-8 py-5 text-center backdrop-blur-sm">
                <div className="font-display text-4xl font-bold">{totalProducts}</div>
                <div className="mt-1 text-sm text-white/70">products</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Brand sections ── */}
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-14">
        {category.groups.map((group: ProductGroup) => (
          <section key={group.name}>
            {/* Brand header */}
            <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <span className="text-sm font-black text-primary">{group.name.slice(0, 2)}</span>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-navy">{group.name}</h2>
                <p className="text-sm text-slate-500">{group.products.length} models</p>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.products.map((p: Product) => {
                const gradient = getBrandGradient(group.name);
                const hasDesc = p.description && !isBoilerplate(p.description);
                return (
                  <Link
                    key={p.slug}
                    to="/products/$category/$product"
                    params={{ category: category.slug, product: p.slug }}
                    className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 overflow-hidden"
                  >
                    {/* Image / colour band */}
                    <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient}`}>
                      {/* Brand watermark */}
                      <span className="select-none font-display text-5xl font-black tracking-tight text-black/[0.06]">
                        {group.name.slice(0, 4)}
                      </span>
                      {/* Brand chip */}
                      <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy/80 backdrop-blur-sm shadow-sm">
                        {group.name}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-base font-semibold leading-snug text-navy group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      {hasDesc && (
                        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">{p.description}</p>
                      )}
                      <div className="mt-auto flex items-center gap-1 pt-3 text-xs font-semibold text-primary">
                        View details
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="bg-gradient-to-r from-[#0a2540] to-[#1a4a6e] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Need help selecting the right {category.name.toLowerCase()}?
          </h2>
          <p className="mt-4 text-white/70">
            Our specialists guide you through selection, installation and after-sales support across Gujarat and Pan-India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy shadow hover:bg-white/90 transition">
              <Phone className="h-4 w-4" /> Talk to an Expert
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white hover:bg-white/20 transition backdrop-blur-sm">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
