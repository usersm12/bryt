import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTA";
import img from "@/assets/turnkey.jpg";

export const Route = createFileRoute("/turnkey")({
  head: () => ({ meta: [
    { title: "Turnkey Dental Clinic Setup | BRYT Dental Technologies" },
    { name: "description", content: "From empty space to opening day — BRYT's flagship turnkey clinic setup service. Pan-India delivery and installation." },
  ]}),
  component: TurnkeyPage,
});

const steps = [
  { d: "Day 1", t: "Free Consultation", b: "We understand your space, budget, vision and case mix." },
  { d: "Week 1", t: "Design & Layout", b: "Operatory flow, sterilisation zones, reception design." },
  { d: "Week 2-3", t: "Procurement", b: "Chairs, instruments, sterilisation, imaging, furniture." },
  { d: "Week 4-5", t: "Civil & MEP", b: "Plumbing, electrical, compressed air, suction lines." },
  { d: "Week 6", t: "Installation", b: "Equipment installation, calibration, commissioning." },
  { d: "Day 45", t: "Training & Handover", b: "Staff training and grand opening — you're live." },
];

function TurnkeyPage() {
  return (
    <Layout>
      <PageHero eyebrow="★ Flagship Service" title="Turnkey Clinic Setup. We Build It. You Open It." subtitle="From an empty space to your first patient — one partner, one timeline, zero surprises.">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-sea px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft">
          Schedule a Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <img src={img} alt="Turnkey clinic interior" loading="lazy" width={1600} height={1000} className="w-full rounded-2xl shadow-soft" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">From Empty Space to Opening Day</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">A clear, predictable timeline — so you know what's happening every week.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="absolute -top-3 left-6 rounded-full bg-gradient-sea px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">{s.d}</span>
              <div className="mb-2 font-display text-sm font-bold text-primary">Step {i + 1}</div>
              <h3 className="font-display text-xl font-bold text-navy">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">What's Included</h2>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Dental chairs & operatory units",
              "Handpieces & instruments",
              "Sterilisation & infection-control",
              "Intra-oral & OPG imaging",
              "Implant system & surgical kits",
              "Compressors & suction",
              "Reception & clinic furniture",
              "Civil, plumbing & electrical coordination",
              "Staff training & soft launch support",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-card">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" /><span className="text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">Real Clinics. Real Results.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { c: "Smile Studio", city: "Rajkot", pkg: "Single-chair turnkey", out: "Opened in 6 weeks, fully booked by month two." },
            { c: "Shah Dental Care", city: "Ahmedabad", pkg: "Two-operatory + implants", out: "Implant cases up 3x within 6 months." },
            { c: "Joshi Multispeciality", city: "Surat", pkg: "Four-chair multi-doc", out: "Audit-ready sterilisation, zero downtime." },
          ].map((s) => (
            <div key={s.c} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <Quote className="h-7 w-7 text-primary/40" />
              <div className="mt-3 font-display text-lg font-bold text-navy">{s.c}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.city} · {s.pkg}</div>
              <p className="mt-3 text-sm text-foreground/80">{s.out}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Don't Start Your Clinic Journey Without a Free BRYT Consultation." subtitle="One conversation could save you lakhs and months of stress." />
    </Layout>
  );
}
