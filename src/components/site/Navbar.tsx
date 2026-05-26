import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { categories, brands } from "@/lib/products";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);

  const closeMega = () => setMega(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-sea text-primary-foreground font-display font-bold">B</div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-navy">BRYT</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Dental Tech</div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex" onMouseLeave={closeMega}>
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
            activeOptions={{ exact: true }}
            onMouseEnter={closeMega}
          >
            Home
          </Link>

          {categories.map((c) => (
            <div key={c.slug} onMouseEnter={() => setMega(c.slug)} className="relative">
              <Link
                to="/products/$category"
                params={{ category: c.slug }}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground/80 hover:bg-secondary hover:text-primary"
              >
                {c.name} <ChevronDown className="h-3 w-3" />
              </Link>
            </div>
          ))}

          <div onMouseEnter={() => setMega("brands")} className="relative">
            <Link to="/brands" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground/80 hover:bg-secondary hover:text-primary">
              Brands <ChevronDown className="h-3 w-3" />
            </Link>
          </div>

          <Link
            to="/turnkey"
            className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground/80 hover:bg-secondary hover:text-primary"
            onMouseEnter={closeMega}
          >
            Turnkey Clinic Setup
          </Link>

          <Link
            to="/contact"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            onMouseEnter={closeMega}
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-sea px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
            <Phone className="h-4 w-4" /> Free Consultation
          </Link>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mega menu panel */}
      {mega && (
        <div className="absolute inset-x-0 top-full hidden lg:block" onMouseLeave={closeMega}>
          <div className="border-t border-border bg-background shadow-card">
            <div className="mx-auto max-w-7xl px-6 py-8">
              {categories.find((c) => c.slug === mega) && (
                <MegaCategory slug={mega} onClick={closeMega} />
              )}
              {mega === "brands" && (
                <div>
                  <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-primary">Brands we distribute</h3>
                  <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                    {brands.map((b) => (
                      <Link key={b} to="/brands" onClick={closeMega} className="rounded-md border border-border bg-card px-3 py-2 text-center text-xs font-semibold text-navy hover:border-primary/40 hover:text-primary">
                        {b}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-border lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link to="/" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">Home</Link>
            {categories.map((c) => (
              <Link key={c.slug} to="/products/$category" params={{ category: c.slug }} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium uppercase hover:bg-secondary">
                {c.name}
              </Link>
            ))}
            <Link to="/brands" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium uppercase hover:bg-secondary">Brands</Link>
            <Link to="/turnkey" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium uppercase hover:bg-secondary">Turnkey Clinic Setup</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">Contact</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-gradient-sea px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaCategory({ slug, onClick }: { slug: string; onClick: () => void }) {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return null;
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">{cat.name}</h3>
        <Link to="/products/$category" params={{ category: cat.slug }} onClick={onClick} className="text-xs font-semibold text-primary">View all →</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {cat.groups.map((g) => (
          <div key={g.name}>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-navy">{g.name}</div>
            <ul className="space-y-1">
              {g.products.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/products/$category/$product"
                    params={{ category: cat.slug, product: p.slug }}
                    onClick={onClick}
                    className="block text-sm text-foreground/75 hover:text-primary"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              {g.products.length > 8 && (
                <li>
                  <Link to="/products/$category" params={{ category: cat.slug }} onClick={onClick} className="text-xs font-semibold text-primary">
                    +{g.products.length - 8} more
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
