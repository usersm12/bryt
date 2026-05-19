import { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 80% 10%, oklch(0.75 0.13 220), transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">{eyebrow}</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-foreground/70">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
