import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection({ title, subtitle, primaryLabel = "Schedule Free Consultation" }: { title: string; subtitle?: string; primaryLabel?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-sea py-20 text-primary-foreground">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">{subtitle}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-[1.03]">
            {primaryLabel} <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="tel:+919727806997" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
            <Phone className="h-4 w-4" /> Call +91 97278 06997
          </a>
        </div>
      </div>
    </section>
  );
}
