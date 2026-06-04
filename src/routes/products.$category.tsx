import { createFileRoute, Link, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { dbGetCategory, type Category, type ProductGroup, type Product } from "@/lib/db.server";
import { ChevronRight, ArrowRight, Phone, CheckCircle2, Palette, Ruler, Settings2, Shield } from "lucide-react";

// ─── Static per-category marketing content ────────────────────────────────────
import chairImg     from "@/assets/dental-chair.jpg";
import handpieceImg from "@/assets/handpieces.jpg";
import sterilImg    from "@/assets/sterilisation.jpg";
import implantImg   from "@/assets/implants.jpg";

type MarketingSection = {
  hero:    { eyebrow: string; title: string; subtitle: string };
  feature: { image: string; heading: string; body: string; bullets: string[] };
  why:     { heading: string; cards: { icon: React.ElementType; title: string; desc: string }[] } | null;
  cta:     { title: string; subtitle: string };
};

const MARKETING: Record<string, MarketingSection> = {
  "dental-chair-units": {
    hero: {
      eyebrow: "Dental Chairs & Units",
      title: "Chairs Built for Comfort. Engineered for Precision.",
      subtitle: "From the flagship Lifedent E9 to compact cart-version units — chairs that elevate every appointment.",
    },
    feature: {
      image: chairImg,
      heading: "Featured: Lifedent E9 Series",
      body: "A premium chair engineered around the dentist's posture and the patient's comfort. Whisper-quiet motors, intuitive controls, and a build quality that lasts a decade.",
      bullets: [
        "30+ upholstery colours — match any interior",
        "Cart-version adjustable height 750–900 mm",
        "Programmable doctor positions",
        "Seamless integration with imaging & sterilisation",
        "USA-precision pneumatic & electric parts",
      ],
    },
    why: {
      heading: "Why dentists choose BRYT chairs",
      cards: [
        { icon: Palette,   title: "30+ Colours",  desc: "Match your brand interior exactly." },
        { icon: Ruler,     title: "Ergonomic",    desc: "Designed for long clinical days." },
        { icon: Settings2, title: "Modular",      desc: "Add imaging, scaler, ultrasonic." },
        { icon: Shield,    title: "Warranty",     desc: "Comprehensive AMC and parts." },
      ],
    },
    cta: { title: "Book a Showroom Visit at Our Rajkot Office.", subtitle: "See the chair before you decide. We'll walk you through every feature." },
  },
  "handpieces": {
    hero: {
      eyebrow: "Handpieces & Instruments",
      title: "Precision in Every Rotation.",
      subtitle: "High-speed handpieces, scalers, and instruments built for accuracy, longevity, and patient comfort.",
    },
    feature: {
      image: handpieceImg,
      heading: "Engineered for the long day.",
      body: "Ceramic bearings, quiet operation, and durable construction — handpieces that hold up appointment after appointment.",
      bullets: [
        "High-speed air rotors (350,000 RPM)",
        "Low-speed contra-angles & straight handpieces",
        "Ultrasonic scalers with multiple tip options",
        "Autoclavable to 135°C — strict infection control",
        "Spare parts and rapid replacement program",
      ],
    },
    why: null,
    cta: { title: "Not Sure Which Handpiece Fits?", subtitle: "Our team will help you choose based on your case mix and budget." },
  },
  "radiology": {
    hero: {
      eyebrow: "Radiology Equipment",
      title: "Clarity That Changes Diagnoses.",
      subtitle: "Intraoral sensors, OPGs, and CBCT systems — precise imaging for every practice size.",
    },
    feature: {
      image: chairImg,
      heading: "From sensor to CBCT.",
      body: "A full radiology stack from Acteon, Vatech, and Eighteeth — with on-site commissioning and calibration included in every installation.",
      bullets: [
        "Intraoral sensors with instant image capture",
        "2D OPG panoramic systems",
        "3D CBCT for implant planning & orthodontics",
        "Software integration with your practice management",
        "Radiation safety and regulatory compliance support",
      ],
    },
    why: null,
    cta: { title: "Need Help Choosing a Radiology System?", subtitle: "We'll assess your case volume, space, and budget to recommend the right fit." },
  },
  "clinical-products": {
    hero: {
      eyebrow: "Clinical Products",
      title: "Everything the Modern Clinic Needs.",
      subtitle: "Endomotors, scalers, sterilisation, lighting, and more — all from one team.",
    },
    feature: {
      image: sterilImg,
      heading: "Complete clinical support.",
      body: "From endodontics to implantology, sterilisation to scanning — BRYT supplies and services the full equipment stack across Gujarat and Pan-India.",
      bullets: [
        "Endomotors with apex locators",
        "Ultrasonic scalers & piezo units",
        "Autoclave & sterilisation equipment",
        "LED operating lights & loupes",
        "Intraoral scanners & microscopes",
      ],
    },
    why: null,
    cta: { title: "Equip Your Clinic End-to-End.", subtitle: "One team. Every product category. Gujarat & Pan-India installation." },
  },
};

// ─── Data loading ─────────────────────────────────────────────────────────────

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

// Detect auto-generated boilerplate
function isBoilerplate(desc: string): boolean {
  return !desc || desc.includes("supplied, installed and serviced by BRYT");
}

const brandGradients: Record<string, string> = {
  LIFEDENT: "from-blue-50 to-sky-100",
  BIODENT: "from-teal-50 to-cyan-100",
  DIPLOMAT: "from-indigo-50 to-blue-100",
  BRYT: "from-sky-50 to-blue-100",
  ACTEON: "from-violet-50 to-purple-100",
  VATECH: "from-emerald-50 to-teal-100",
  EIGHTEETH: "from-orange-50 to-amber-100",
  FIN: "from-rose-50 to-pink-100",
  BDC: "from-blue-50 to-indigo-100",
  GALAXY: "from-cyan-50 to-sky-100",
  default: "from-slate-50 to-blue-50",
};

// ─── Page component ───────────────────────────────────────────────────────────

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const matches = useMatches();
  const isProductPage = matches[matches.length - 1]?.routeId === "/products/$category/$product";
  if (isProductPage) return <Outlet />;

  const mkt = MARKETING[category.slug] ?? null;
  const totalProducts = category.groups.reduce((n: number, g: ProductGroup) => n + g.products.length, 0);

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 px-6 pb-16 pt-12">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-primary transition">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-navy">{category.name}</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {mkt && (
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">{mkt.hero.eyebrow}</p>
              )}
              <h1 className="font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
                {mkt ? mkt.hero.title : category.name}
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                {mkt ? mkt.hero.subtitle : category.description}
              </p>
              {mkt && (
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition">
                    Request a Demo
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition">
                    Get a Quotation
                  </Link>
                </div>
              )}
            </div>
            <div className="shrink-0 rounded-2xl border border-primary/20 bg-white px-8 py-5 text-center shadow-sm">
              <div className="font-display text-4xl font-bold text-primary">{totalProducts}</div>
              <div className="mt-1 text-sm text-slate-500">products</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured product section ── */}
      {mkt && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <img
              src={mkt.feature.image}
              alt={mkt.feature.heading}
              loading="lazy"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
            <div>
              <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">{mkt.feature.heading}</h2>
              <p className="mt-4 text-slate-600">{mkt.feature.body}</p>
              <ul className="mt-6 space-y-3">
                {mkt.feature.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── Why choose BRYT ── */}
      {mkt?.why && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">{mkt.why.heading}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {mkt.why.cards.map((c) => (
                <div key={c.title} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All products by brand ── */}
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-16">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy">Browse All {category.name}</h2>
          <p className="mt-1 text-slate-500">
            {totalProducts} products across {category.groups.length} brands
          </p>
        </div>

        {category.groups.map((group: ProductGroup) => (
          <section key={group.name}>
            <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <span className="text-sm font-black text-primary">{group.name.slice(0, 2)}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-navy">{group.name}</h3>
                <p className="text-sm text-slate-500">{group.products.length} models</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.products.map((p: Product) => {
                const gradient = brandGradients[group.name?.toUpperCase()] ?? brandGradients.default;
                const hasDesc = p.description && !isBoilerplate(p.description);
                return (
                  <Link
                    key={p.slug}
                    to="/products/$category/$product"
                    params={{ category: category.slug, product: p.slug }}
                    className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20"
                  >
                    <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient}`}>
                      <span className="select-none font-display text-5xl font-black tracking-tight text-black/[0.06]">
                        {group.name.slice(0, 4)}
                      </span>
                      <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy/80 backdrop-blur-sm shadow-sm">
                        {group.name}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h4 className="font-display text-base font-semibold leading-snug text-navy group-hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                      {hasDesc && (
                        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">{p.description}</p>
                      )}
                      <div className="mt-auto flex items-center gap-1 pt-3 text-xs font-semibold text-primary">
                        View details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
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
            {mkt ? mkt.cta.title : `Need help with ${category.name.toLowerCase()}?`}
          </h2>
          <p className="mt-4 text-white/70">
            {mkt ? mkt.cta.subtitle : "Our specialists guide you through selection, installation and after-sales support."}
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
