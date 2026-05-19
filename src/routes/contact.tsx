import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact BRYT Dental Technologies — Rajkot" },
    { name: "description", content: "Talk to BRYT Dental Technologies. Visit our Rajkot showroom or schedule a free clinic consultation." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHero eyebrow="Let's Talk" title="Build Something Great With BRYT." subtitle="Tell us about your clinic vision — we'll respond within one business day." />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              {sent ? (
                <div className="py-16 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-sea text-primary-foreground"><Send className="h-6 w-6" /></div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-navy">Thank you!</h3>
                  <p className="mt-2 text-muted-foreground">Your enquiry is in. We'll reach out within one business day.</p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-navy">Send your enquiry</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name *" name="name" required />
                    <Field label="Phone Number *" name="phone" type="tel" required />
                    <Field label="Email Address *" name="email" type="email" required />
                    <Field label="City / Location" name="city" />
                  </div>
                  <div className="mt-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your enquiry *</label>
                    <textarea required rows={5} name="message" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Tell us about your clinic plans, equipment needs, or timeline..." />
                  </div>
                  <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-sea px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform">
                    Send My Enquiry <Send className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <InfoCard icon={MapPin} title="Visit our showroom">Rajkot, Gujarat, India<br /><span className="text-muted-foreground">See chairs, instruments and turnkey demos.</span></InfoCard>
            <InfoCard icon={Phone} title="Call us"><a href="tel:+919727806997" className="text-primary hover:underline">+91 97278 06997</a></InfoCard>
            <InfoCard icon={Mail} title="Email"><a href="mailto:brytdental@gmail.com" className="text-primary hover:underline">brytdental@gmail.com</a></InfoCard>
            <InfoCard icon={Clock} title="Hours">Mon – Sat · 10:00 AM – 7:00 PM</InfoCard>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-border shadow-card">
          <iframe
            title="BRYT Dental Technologies — Rajkot"
            src="https://www.google.com/maps?q=Rajkot,Gujarat&output=embed"
            className="h-[400px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input type={type} name={name} required={required} className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-sea text-primary-foreground"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="font-display font-bold text-navy">{title}</div>
          <div className="mt-1 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
