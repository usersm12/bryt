import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { categories, brands } from "@/lib/products";
import brytLogo from "@/assets/bryt-logo.png";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Delay close so moving from trigger → panel doesn't flash-close
  const openMega = (slug: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(slug);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMega(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" onClick={() => setMega(null)}>
          <img src={brytLogo} alt="BRYT Dental Technologies" className="h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
            activeOptions={{ exact: true }} onMouseEnter={() => { scheduleClose(); cancelClose(); setMega(null); }}>
            Home
          </Link>

          {/* Products — single clean dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openMega("products")}
            onMouseLeave={scheduleClose}
          >
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary">
              Products <ChevronDown className={`h-3 w-3 transition-transform ${mega === "products" ? "rotate-180" : ""}`} />
            </button>
          </div>

          <Link to="/brands" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            onMouseEnter={() => { scheduleClose(); cancelClose(); setMega(null); }}>
            Brands
          </Link>
          <Link to="/turnkey" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            onMouseEnter={() => { scheduleClose(); cancelClose(); setMega(null); }}>
            Turnkey Setup
          </Link>
          <Link to="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            onMouseEnter={() => { scheduleClose(); cancelClose(); setMega(null); }}>
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-sea px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
            <Phone className="h-4 w-4" /> Free Consultation
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Products mega dropdown */}
      {mega === "products" && (
        <div
          className="absolute inset-x-0 top-full hidden lg:block"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="border-t border-border bg-background shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">Products</h3>
                <Link to="/products" onClick={() => setMega(null)} className="text-xs font-semibold text-primary hover:underline">
                  View full catalogue →
                </Link>
              </div>
              {/* 4 category cards — clean, no product lists */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/products/$category"
                    params={{ category: c.slug }}
                    onClick={() => setMega(null)}
                    className="group rounded-xl border border-border p-5 transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <div className="font-display font-bold text-navy group-hover:text-primary">{c.name}</div>
                    <div className="mt-1.5 text-xs text-muted-foreground">{c.tagline}</div>
                    <div className="mt-3 text-xs font-semibold text-primary">
                      {c.groups.reduce((n, g) => n + g.products.length, 0)} products →
                    </div>
                  </Link>
                ))}
              </div>

              {/* Brand chips */}
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Brands we distribute</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <Link key={b} to="/brands" onClick={() => setMega(null)}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-navy hover:border-primary/40 hover:text-primary">
                      {b}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">Home</Link>
            <div className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Products</div>
            {categories.map((c) => (
              <Link key={c.slug} to="/products/$category" params={{ category: c.slug }} onClick={() => setMobileOpen(false)}
                className="block rounded-md px-5 py-2 text-sm font-medium hover:bg-secondary">
                {c.name}
              </Link>
            ))}
            <Link to="/brands" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">Brands</Link>
            <Link to="/turnkey" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">Turnkey Setup</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">Contact</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-full bg-gradient-sea px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
