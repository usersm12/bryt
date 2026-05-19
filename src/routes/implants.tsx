import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTA";
import img from "@/assets/implants.jpg";

export const Route = createFileRoute("/implants")({
  head: () => ({ meta: [
    { title: "Dental Implant Systems — EM-3 | BRYT Dental" },
    { name: "description", content: "EM-3 implant system with surgical kits, prosthetic components and clinical training." },
  ]}),
  component: () => (
    <Layout>
      <PageHero eyebrow="Dental Implant Systems" title="Start Offering Implants With Confidence." subtitle="The EM-3 implant system — surgical kits, prosthetic components and full clinical training to take your practice further." />
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <img src={img} alt="Titanium dental implants" loading="lazy" width={1280} height={960} className="rounded-2xl shadow-soft" />
        <div>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">EM-3 — designed for predictability.</h2>
          <p className="mt-4 text-muted-foreground">Whether you're placing your first implant or your hundredth, EM-3 gives you the system, kit, and back-office support to grow confidently.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Grade-4 titanium with SLA surface",
              "Complete surgical & prosthetic kits",
              "CAD/CAM-compatible abutments",
              "On-site clinical training & mentoring",
              "Bundle into Turnkey or AMC packages",
            ].map((p) => <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-primary"/><span>{p}</span></li>)}
          </ul>
        </div>
      </section>
      <CTASection title="Start Offering Implants — Get the EM-3 Consultation." primaryLabel="Request EM-3 Demo" />
    </Layout>
  ),
});
