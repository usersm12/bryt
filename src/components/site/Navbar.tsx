import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/dental-chairs", label: "Dental Chairs" },
  { to: "/handpieces", label: "Handpieces" },
  { to: "/sterilisation", label: "Sterilisation" },
  { to: "/implants", label: "Implants" },
  { to: "/turnkey", label: "Turnkey Setup" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
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
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
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
      {open && (
        <div className="border-t border-border lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-gradient-sea px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
