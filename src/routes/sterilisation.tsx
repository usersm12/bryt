import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTA";
import img from "@/assets/sterilisation.jpg";

export const Route = createFileRoute("/sterilisation")({
  head: () => ({ meta: [
    { title: "Sterilisation & Infection Control | BRYT Dental" },
    { name: "description", content: "Autoclaves, sealers, ultrasonic cleaners — build a sterilisation setup patients trust." },
  ]}),
  component: () => (
    <Layout>
      <PageHero eyebrow="Sterilisation & Infection Control" title="A Sterilisation Setup Patients Can Trust." subtitle="Class-B autoclaves, pouch sealers, ultrasonic cleaners — designed for audit-ready, low-friction workflows." />
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Compliance, simplified.</h2>
          <p className="mt-4 text-muted-foreground">From single-chair clinics to multi-operatory practices — sterilisation setups that scale with you and keep your team confident.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Class-B vacuum autoclaves with traceability",
              "Pouch sealers and indicators",
              "Ultrasonic cleaners & instrument tubs",
              "Workflow design for clean/dirty zones",
              "Staff training on protocols",
            ].map((p) => <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-primary"/><span>{p}</span></li>)}
          </ul>
        </div>
        <img src={img} alt="Sterilisation equipment" loading="lazy" width={1280} height={960} className="rounded-2xl shadow-soft" />
      </section>
      <CTASection title="Build a Sterilisation Setup That Patients Can Trust." primaryLabel="Get a Package Quote" />
    </Layout>
  ),
});
