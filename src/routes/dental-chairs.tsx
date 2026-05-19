import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Palette, Ruler, Settings2, Shield } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTA";
import chairImg from "@/assets/dental-chair.jpg";

export const Route = createFileRoute("/dental-chairs")({
  head: () => ({ meta: [
    { title: "Dental Chairs & Units | BRYT Dental Technologies" },
    { name: "description", content: "Lifedent E9-series dental chairs and premium units. 30+ upholstery colours, ergonomic design, USA-precision parts." },
  ]}),
  component: ChairsPage,
});

function ChairsPage() {
  return (
    <Layout>
      <PageHero eyebrow="Dental Chairs & Units" title="Chairs Built for Comfort. Engineered for Precision." subtitle="From the flagship lifedent E9 to compact cart-version units — chairs that elevate every appointment.">
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-full bg-gradient-sea px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">Request a Demo</Link>
          <Link to="/contact" className="rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-primary">Get a Quotation</Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={chairImg} alt="Premium dental chair" loading="lazy" width={1280} height={960} className="rounded-2xl shadow-soft" />
          <div>
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Featured: lifedent E9 Series</h2>
            <p className="mt-4 text-muted-foreground">A premium chair engineered around the dentist's posture and the patient's comfort. Whisper-quiet motors, intuitive controls, and a build quality that lasts a decade.</p>
            <ul className="mt-6 space-y-3">
              {[
                "30+ upholstery colours — match any interior",
                "Cart-version adjustable height 750–900mm",
                "Programmable doctor positions",
                "Seamless integration with imaging & sterilisation",
                "USA-precision pneumatic & electric parts",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" /><span>{p}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">Why dentists choose BRYT chairs</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { i: Palette, t: "30+ Colours", d: "Match your brand interior exactly." },
              { i: Ruler, t: "Ergonomic", d: "Designed for long clinical days." },
              { i: Settings2, t: "Modular", d: "Add imaging, scaler, ultrasonic." },
              { i: Shield, t: "Warranty", d: "Comprehensive AMC and parts." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-sea text-primary-foreground"><f.i className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{f.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Book a Showroom Visit at Our Rajkot Office." subtitle="See the chair before you decide. We'll walk you through every feature." primaryLabel="Request a Demo" />
    </Layout>
  );
}
