import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Wrench, Award, Building2, Stethoscope, Syringe, ShieldPlus, Quote, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CTASection } from "@/components/site/CTA";
import heroImg from "@/assets/hero-clinic.jpg";
import chairImg from "@/assets/dental-chair.jpg";
import handpieceImg from "@/assets/handpieces.jpg";
import sterilImg from "@/assets/sterilisation.jpg";
import implantImg from "@/assets/implants.jpg";
import turnkeyImg from "@/assets/turnkey.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRYT Dental Technologies — Your Dental Technologist | Rajkot" },
      { name: "description", content: "Premium dental chairs, handpieces, sterilisation & turnkey clinic setup. Trusted by 500+ dentists across India." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { n: "500+", l: "Clinics Equipped" },
  { n: "15+", l: "Years Experience" },
  { n: "USA", l: "Precision Parts" },
  { n: "Pan-India", l: "Delivery & Install" },
  { n: "24/7", l: "Service Support" },
];

const services = [
  { to: "/dental-chairs", icon: Building2, title: "Dental Chairs & Units", desc: "Lifedent E9-series and premium chairs with 30+ upholstery colours.", img: chairImg },
  { to: "/handpieces", icon: Stethoscope, title: "Handpieces & Instruments", desc: "High-speed precision handpieces, autoclavable to Indian standards.", img: handpieceImg },
  { to: "/sterilisation", icon: ShieldPlus, title: "Sterilisation & Infection Control", desc: "Build a setup patients can trust — autoclaves, sealers, ultrasonics.", img: sterilImg },
  { to: "/implants", icon: Syringe, title: "Dental Implant Systems", desc: "EM-3 implant system with full clinical training & support.", img: implantImg },
];

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium dental clinic with sea blue accents" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl text-navy-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Your Dental Technologist
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Trusted by Clinics<br />Across India.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-foreground/85 sm:text-xl">
              Precision equipment. Expert guidance. End-to-end clinic solutions. From Rajkot — built for dentists who demand the best.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-soft transition-transform hover:scale-[1.03]">
                Get a Free Clinic Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/turnkey" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                View Turnkey Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 py-8 sm:justify-between">
          {stats.map((s) => (
            <div key={s.l} className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-sea-light">{s.n}</span>
              <span className="text-sm text-navy-foreground/80">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <span className="rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">The Reality</span>
        <h2 className="mt-5 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
          Setting Up a Dental Clinic is Overwhelming —<br className="hidden md:block" /> Unless You Have the Right Partner.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Wrong equipment choice means patient discomfort, equipment failure, wasted lakhs, and a delayed launch.
          BRYT has guided 500+ dentists through this journey — from choosing the right chair to flipping the switch on opening day.
        </p>
      </section>

      {/* SERVICES */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">What We Offer</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Everything Your Clinic Needs.</h2>
            </div>
            <Link to="/turnkey" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Explore Turnkey Setup <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <Link key={s.to} to={s.to} className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <img src={s.img} alt={s.title} loading="lazy" width={1280} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <div className="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-sea text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TURNKEY FEATURE */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img src={turnkeyImg} alt="BRYT-equipped turnkey dental clinic" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Flagship Offering</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Turnkey Clinic Setup — We Build It. You Open It.</h2>
            <p className="mt-4 text-muted-foreground">From empty space to opening day. Consultation, design, procurement, installation, training and after-sales — one trusted partner, one clear timeline.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Free consultation & space audit","Equipment selection within your budget","Civil, plumbing & electrical coordination","Installation, calibration & staff training","Annual maintenance & support"].map((p) => (
                <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{p}</span></li>
              ))}
            </ul>
            <Link to="/turnkey" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sea px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.03] transition-transform">
              Explore Turnkey Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Client Stories</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Dentists Across Gujarat Trust BRYT.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { q: "From site survey to opening day in 6 weeks. BRYT handled every detail — I just focused on patients.", a: "Dr. Mehul Patel", c: "Smile Studio, Rajkot" },
              { q: "The lifedent E9 is buttery smooth. My patients notice the difference — and so does my back at end of day.", a: "Dr. Riya Shah", c: "Shah Dental Care, Ahmedabad" },
              { q: "Sterilisation setup is rock-solid. Audit-ready, simple workflows, and zero downtime in 18 months.", a: "Dr. Karan Joshi", c: "Joshi Multispeciality, Surat" },
            ].map((t) => (
              <div key={t.a} className="rounded-2xl bg-card p-7 shadow-card">
                <Quote className="h-7 w-7 text-primary/40" />
                <p className="mt-3 text-sm text-foreground/85">"{t.q}"</p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-semibold text-navy">{t.a}</div>
                  <div className="text-xs text-muted-foreground">{t.c}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BRYT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Why BRYT</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">A partner, not just a supplier.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            { icon: Award, t: "USA-precision parts", d: "Authorised dealer, imported quality." },
            { icon: ShieldCheck, t: "Tested & validated", d: "Every unit inspected before dispatch." },
            { icon: Truck, t: "Pan-India delivery", d: "Doorstep installation in any city." },
            { icon: Wrench, t: "After-sales support", d: "AMC, parts, and rapid service." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><f.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Ready to Build Your Dream Dental Clinic?" subtitle="Talk to BRYT today — a 20-minute consultation could save you lakhs and months of stress." />
    </Layout>
  );
}
