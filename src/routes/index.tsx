import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Quote, CheckCircle2, Building2, Stethoscope, ShieldPlus, Syringe, Compass, Layers, LifeBuoy, Phone, MapPin, BookOpen, Award, Users, Clock, Globe2 } from "lucide-react";
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
      { title: "BRYT Dental Technologies — Equip Your Clinic Right From Day One" },
      { name: "description", content: "Trusted by 500+ clinics across India. Dental chairs, handpieces, sterilisation, implants, and complete turnkey clinic setup with USA precision components." },
    ],
  }),
  component: HomePage,
});

const services = [
  { to: "/dental-chairs", icon: Building2, title: "Dental Chairs & Units", desc: "Lifedent E9 series treatment units built for comfort, efficiency, and years of trouble-free clinical use.", img: chairImg },
  { to: "/handpieces", icon: Stethoscope, title: "Handpieces & Instruments", desc: "Four configurations, USA-sourced precision components. Your primary instrument cannot be a point of failure.", img: handpieceImg },
  { to: "/sterilisation", icon: ShieldPlus, title: "Sterilisation & Infection Control", desc: "Autoclaves, UV chambers, and oil-free compressors. Non-negotiable systems planned right from day one.", img: sterilImg },
  { to: "/implants", icon: Syringe, title: "EM-3 Implant System", desc: "Compact, precise torque control. The system that lets you deliver implantology with confidence.", img: implantImg },
  { to: "/turnkey", icon: Layers, title: "Turnkey Clinic Setup", desc: "Planning, sourcing, installation, commissioning, and after-sales. One team. One process. Zero chaos.", img: turnkeyImg },
];

const trustStats = [
  { icon: Users, n: "500+", l: "Clinics Equipped" },
  { icon: Globe2, n: "15+", l: "Cities Across India" },
  { icon: Clock, n: "12+ Yrs", l: "Industry Experience" },
  { icon: Award, n: "USA", l: "Precision Components" },
];

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern dental clinic interior" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/65 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl text-navy-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Your Dental Technologist
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Equip Your Clinic Right From Day One.
            </h1>
            <p className="mt-6 max-w-xl text-base text-navy-foreground/85 sm:text-lg">
              BRYT helps dentists across Gujarat and India plan, source, and install reliable, patient-ready dental clinics — coordinated by one experienced team, from first conversation to opening day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-soft transition-transform hover:scale-[1.03]">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/turnkey" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                Explore Clinic Setup
              </Link>
            </div>
          </div>
        </div>
        {/* Trust strip */}
        <div className="relative border-t border-white/10 bg-navy/85 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
            {trustStats.map((s) => (
              <div key={s.l} className="flex items-center gap-3 bg-navy px-6 py-5 text-navy-foreground">
                <s.icon className="h-6 w-6 text-sea-light" />
                <div>
                  <div className="font-display text-lg font-bold leading-none">{s.n}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-navy-foreground/70">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE REALITY — tighter intro */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <div className="text-center">
          <span className="rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Why Setup Goes Wrong</span>
          <h2 className="mt-5 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
            You Trained to Be a Dentist. Not a Procurement Specialist.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Clinic setup demands choosing chairs you've never sat in, comparing specs from vendors who all claim to be the best, and coordinating delivery, installation and compliance — all while practising dentistry.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-navy sm:text-lg">
            We've already made every mistake so you don't have to. That's what BRYT is for.
          </p>
        </div>
      </section>

      {/* WHAT BRYT DOES */}
      <section className="bg-gradient-to-b from-secondary/40 via-secondary/30 to-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">What We Supply</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Every Technology Your Clinic Needs. None It Doesn't.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">A focused range chosen for one purpose: reliable, long-term clinical performance.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.to} to={s.to} className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <img src={s.img} alt={s.title} loading="lazy" width={1280} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-sea text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BRYT — trust pillars */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Why Dentists Choose BRYT</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">We've Done This 500 Times. You're Not a Test Case.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, t: "Honest, Unbiased Guidance", body: "We recommend based on your workflow, space, and patient volume — not what carries the highest margin." },
            { icon: ShieldPlus, t: "Technology Chosen for Durability", body: "Lifedent E9 units, USA-component handpieces, EM-3 implants — selected because they last, not because they sell." },
            { icon: LifeBuoy, t: "Support Beyond Delivery", body: "Installation, commissioning, staff training, and ongoing after-sales — handled by the same team that planned it." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-7 shadow-card transition-colors hover:border-primary/40">
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><c.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{c.t}</h3>
              <p className="mt-3 text-sm text-foreground/85">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Credibility badges */}
        <div className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="grid gap-6 text-center sm:grid-cols-2 md:grid-cols-4">
            {[
              { k: "Authorised Distribution", v: "Lifedent · EM-3 Series" },
              { k: "Compliance Ready", v: "Infection Control Standards" },
              { k: "Coverage", v: "Gujarat & Pan-India" },
              { k: "Warranty Support", v: "On-Site Service Network" },
            ].map((b) => (
              <div key={b.k}>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{b.k}</div>
                <div className="mt-1 font-display text-sm font-bold text-navy">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TURNKEY */}
      <section className="bg-gradient-hero py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-soft">
              <img src={turnkeyImg} alt="Turnkey dental clinic setup by BRYT" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Turnkey Setup</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">From Empty Space to Opening Day. One Team. Zero Chaos.</h2>
              <p className="mt-4 text-muted-foreground">DIY setups stall on incompatible equipment, mismatched delivery timelines, and vendors who disappear after invoicing. We eliminate every one of those problems.</p>
              <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  "Clinic planning & layout",
                  "Equipment guidance & sourcing",
                  "Operatory & sterilisation design",
                  "Delivery coordination",
                  "Installation & commissioning",
                  "Staff training & after-sales",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-foreground/85">{p}</span></li>
                ))}
              </ul>
              <Link to="/turnkey" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sea px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.03] transition-transform">
                Plan My Clinic Setup <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TECH — condensed */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Featured Technology</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">The Stack Behind Every BRYT Clinic</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { img: chairImg, t: "Lifedent E9 Series Units", d: "7-inch touchscreen, V5 LED surgical lighting (8,000–35,000 LUX), multi-function tubing disinfection. Available in E9-c (hanging), E9-i (whip-arm) and E9-t (cart)." },
            { img: handpieceImg, t: "Handpiece Series", d: "Triple spray, single spray latch, external spray contra, and straight — built with USA-sourced precision components." },
            { img: sterilImg, t: "Sterilisation Systems", d: "Autoclave, UV chamber and oil-free compressor planned as a workflow — not bolted on at the end." },
            { img: implantImg, t: "EM-3 Implant Machine", d: "Compact footprint, precise torque control — implantology ready from day one." },
          ].map((c) => (
            <div key={c.t} className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:grid-cols-5">
              <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover sm:col-span-2" />
              <div className="p-6 sm:col-span-3">
                <h3 className="font-display text-lg font-bold text-navy">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF — tightened */}
      <section className="bg-secondary/40 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Trusted by Dentists</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">500+ Clinics. One Standard.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { q: "Multiple vendors, conflicting advice — then BRYT walked us through everything. The clinic opened on schedule with no surprises.", a: "Dr. Mehta", r: "BDS", c: "Rajkot" },
              { q: "Every other vendor pushed their most expensive product. BRYT was the first to ask what I actually needed.", a: "Dr. Patel", r: "MDS Prosthodontics", c: "Ahmedabad" },
              { q: "Honest guidance on where to invest and where to save — without compromising patient experience. Genuinely rare in this industry.", a: "Dr. Shah", r: "BDS", c: "Surat" },
            ].map((t) => (
              <div key={t.c} className="rounded-2xl bg-card p-7 shadow-card">
                <Quote className="h-7 w-7 text-primary/40" />
                <p className="mt-3 text-sm text-foreground/85">"{t.q}"</p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-semibold text-navy">{t.a}</div>
                  <div className="text-xs text-muted-foreground">{t.r} · {t.c}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION CTA */}
      <section className="relative overflow-hidden bg-gradient-sea py-20 text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Know Exactly What Your Clinic Needs Before You Spend a Rupee.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            A free consultation gives you a clear, unbiased view of what your clinic actually needs — based on your specialisation, space, patient volume, and budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-[1.03]">
              Schedule a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              <MapPin className="h-4 w-4" /> Visit Our Rajkot Showroom
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-primary-foreground/90">
            <Phone className="h-4 w-4" /> Call or WhatsApp: <a href="tel:+919727806997" className="font-semibold underline-offset-4 hover:underline">+91 97278 06997</a>
          </p>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Insights</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Read Before You Decide</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { title: "Choosing a Dental Chair That Lasts Until 2031", body: "Evaluate on maintenance history and spare-parts availability — not just price and appearance." },
            { title: "Six Things Dentists Overlook During Setup", body: "Sterilisation room size, compressor placement, power requirements, and after-sales accountability." },
            { title: "Why Sterilisation Should Be Planned First, Not Last", body: "The most common clinic-design mistake — and the correct planning sequence to avoid it." },
          ].map((a, i) => (
            <article key={a.title} className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40">
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><BookOpen className="h-5 w-5" /></div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Article {i + 1}</div>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.body}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="The Best Time to Get This Right Was Before You Opened. The Second Best Time Is Now."
        subtitle="500+ clinics equipped. No pressure. No sales script. Just the clarity that comes from doing this 500 times."
        primaryLabel="Book a Free Consultation"
      />
    </Layout>
  );
}
