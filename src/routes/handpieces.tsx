import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTA";
import img from "@/assets/handpieces.jpg";

export const Route = createFileRoute("/handpieces")({
  head: () => ({ meta: [
    { title: "Handpieces & Instruments | BRYT Dental" },
    { name: "description", content: "Precision high-speed handpieces and dental instruments, autoclavable to Indian infection-control standards." },
  ]}),
  component: () => (
    <Layout>
      <PageHero eyebrow="Handpieces & Instruments" title="Precision in Every Rotation." subtitle="High-speed handpieces, scalers, and instruments built for accuracy, longevity, and patient comfort." />
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <img src={img} alt="Dental handpiece" loading="lazy" width={1280} height={960} className="rounded-2xl shadow-soft" />
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Engineered for the long day.</h2>
          <p className="mt-4 text-muted-foreground">Ceramic bearings, quiet operation, and durable construction — handpieces that hold up appointment after appointment.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "High-speed air rotors (350,000 RPM)",
              "Low-speed contra-angles & straight handpieces",
              "Ultrasonic scalers with multiple tip options",
              "Autoclavable to 135°C — strict infection control",
              "Spare parts and rapid replacement program",
            ].map((p) => <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-primary"/><span>{p}</span></li>)}
          </ul>
        </div>
      </section>
      <CTASection title="Not Sure Which Handpiece Fits?" subtitle="Our team will help you choose based on your case mix and budget." primaryLabel="Talk to an Expert" />
    </Layout>
  ),
});
