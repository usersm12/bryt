import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Quote, CheckCircle2, Building2, Stethoscope, ShieldPlus, Syringe, Wrench, Compass, Layers, LifeBuoy, Phone, MapPin, BookOpen } from "lucide-react";
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
      { title: "BRYT Dental Technologies — Build a Dental Clinic Patients Trust" },
      { name: "description", content: "BRYT helps dentists across Gujarat and India set up modern, reliable, patient-ready clinics — dental chairs, handpieces, sterilisation, implants and turnkey clinic setup." },
    ],
  }),
  component: HomePage,
});

const services = [
  { to: "/dental-chairs", icon: Building2, title: "Dental Chairs & Units", desc: "Modern treatment units designed for patient comfort, ergonomic workflow, and clinical efficiency.", img: chairImg },
  { to: "/handpieces", icon: Stethoscope, title: "Handpieces & Instruments", desc: "Precision instruments built with USA-imported components for smoother operation and dependable daily performance.", img: handpieceImg },
  { to: "/sterilisation", icon: ShieldPlus, title: "Sterilisation & Infection Control", desc: "Autoclaves, UV chambers, and oil-free compressors designed to support safe and compliant clinical environments.", img: sterilImg },
  { to: "/implants", icon: Syringe, title: "Dental Implant Systems", desc: "Advanced implant equipment that helps clinics expand treatment capabilities with confidence.", img: implantImg },
  { to: "/turnkey", icon: Layers, title: "Turnkey Dental Clinic Setup", desc: "Complete clinic planning, equipment sourcing, installation, commissioning, and support through one coordinated partner.", img: turnkeyImg },
];

function HomePage() {
  return (
    <Layout>
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern dental clinic interior" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl text-navy-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Your Dental Technologist
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Build a Dental Clinic<br />Patients Trust From Day One
            </h1>
            <p className="mt-6 max-w-xl text-base text-navy-foreground/85 sm:text-lg">
              BRYT Dental Technologies helps dentists across Gujarat and India set up modern, reliable, patient-ready clinics with thoughtfully selected equipment, expert guidance, and long-term support.
            </p>
            <p className="mt-3 max-w-xl text-base text-navy-foreground/75">
              From dental chairs and handpieces to sterilisation systems and complete turnkey clinic setups, we help you make confident decisions at every stage.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-soft transition-transform hover:scale-[1.03]">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/turnkey" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                Explore Clinic Setup Solutions
              </Link>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-widest text-navy-foreground/70">
              500+ Clinics Supported &nbsp;·&nbsp; USA Precision Components &nbsp;·&nbsp; Installation & After-Sales Support
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE REALITY */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">The Reality of Starting a Dental Clinic</span>
          <h2 className="mt-5 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
            A Dental Clinic Is More Than Just Equipment
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base text-muted-foreground sm:text-lg">
          <p>For most dentists, setting up a clinic is one of the biggest professional and financial decisions they will make.</p>
          <p>Choosing the wrong equipment can affect everything that follows. Patient comfort. Workflow efficiency. Maintenance costs. Treatment confidence. Even the way your clinic is perceived.</p>
          <p>Most dentists are expected to make these decisions while managing budgets, timelines, suppliers, interiors, installation coordination, and compliance requirements.</p>
          <p>That process can quickly become overwhelming.</p>
          <p className="font-semibold text-navy">BRYT exists to simplify it.</p>
          <p>We help dentists create clinics that feel modern, reliable, efficient, and ready for long-term growth.</p>
        </div>
      </section>

      {/* SECTION 3 — WHAT BRYT DOES */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">What BRYT Does</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Everything Your Clinic Needs. Thoughtfully Planned.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We supply and support a carefully selected range of dental technologies designed for everyday clinical reliability and long-term practice growth.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* SECTION 4 — WHY DENTISTS WORK WITH BRYT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Why Dentists Work With BRYT</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Built Around Reliability, Not Just Sales</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, t: "Practical Guidance", body: "We help dentists make informed decisions based on clinic goals, workflow requirements, and long-term usability.", note: "Not every clinic needs the most expensive setup. The right setup is the one that works reliably for years." },
            { icon: Wrench, t: "Carefully Selected Technology", body: "Our product range includes modern dental systems, handpieces, sterilisation solutions, and implant technologies chosen for clinical practicality, durability, and serviceability.", note: "Many of our instruments are built using precision components sourced from the USA." },
            { icon: LifeBuoy, t: "Support Beyond Installation", body: "A clinic setup does not end on delivery day.", note: "BRYT supports clients with installation, commissioning, training guidance, maintenance coordination, and after-sales assistance so clinics can continue operating smoothly." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-7 shadow-card transition-colors hover:border-primary/40">
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><c.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{c.t}</h3>
              <p className="mt-3 text-sm text-foreground/85">{c.body}</p>
              <p className="mt-3 text-sm italic text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — TURNKEY */}
      <section className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img src={turnkeyImg} alt="Turnkey dental clinic setup by BRYT" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Turnkey Clinic Setup</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">From Empty Space to Fully Functional Dental Clinic</h2>
            <p className="mt-4 font-medium text-navy/80">One coordinated process. One experienced team. Less confusion at every step.</p>
            <p className="mt-4 text-muted-foreground">Many dentists spend months speaking to multiple vendors, comparing conflicting recommendations, and trying to coordinate equipment, interiors, installation, and servicing independently.</p>
            <p className="mt-3 text-muted-foreground">Our turnkey clinic setup process brings everything together through a single structured system. We help with:</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Clinic planning and equipment guidance",
                "Dental chair and operatory selection",
                "Handpieces and instrument setup",
                "Sterilisation and infection control planning",
                "Delivery and installation coordination",
                "Equipment commissioning",
                "Staff guidance and operational support",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{p}</span></li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">The goal is simple — to help you open your clinic with clarity, confidence, and fewer costly mistakes.</p>
            <Link to="/turnkey" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sea px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.03] transition-transform">
              Plan My Clinic Setup <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 6 — FEATURED TECHNOLOGIES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Featured Technologies</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Technology Designed for Modern Clinical Practice</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={chairImg} alt="Lifedent E9 Series dental unit" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">Lifedent Dental Units</h3>
              <p className="mt-2 text-sm text-muted-foreground">The Lifedent E9 Series combines ergonomic design, touchscreen controls, integrated workflow systems, and modern treatment functionality for growing practices.</p>
              <p className="mt-2 text-sm text-muted-foreground">Available in multiple configurations based on clinic layout and operational preferences.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={handpieceImg} alt="BRYT handpiece series" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">Handpiece Series</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our handpiece range includes:</p>
              <ul className="mt-2 space-y-1 text-sm text-foreground/80">
                <li>• Triple Spray Contra Handpieces</li>
                <li>• Single Spray Latch-Type Systems</li>
                <li>• External Spray Contra Handpieces</li>
                <li>• Straight Handpieces</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">Designed for consistent clinical performance and everyday usability.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={sterilImg} alt="Sterilisation systems" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">Sterilisation Systems</h3>
              <p className="mt-2 text-sm text-muted-foreground">Autoclaves, UV chambers, and oil-free compressors designed to support modern infection-control standards and cleaner clinical environments.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={implantImg} alt="EM-3 implant machine" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">EM-3 Implant Machine</h3>
              <p className="mt-2 text-sm text-muted-foreground">A compact implant system designed for precision control, smoother workflows, and expanding implant capabilities within modern dental practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SOCIAL PROOF */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Social Proof</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Trusted by Dental Clinics Across Gujarat</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { q: "When we started planning our clinic, we were unsure about what equipment to choose and how to manage the entire setup process. The BRYT team guided us clearly and helped everything come together smoothly.", a: "Dr. [Name]", c: "Rajkot" },
              { q: "The installation process was organised, the equipment quality felt reliable, and the support after setup made a big difference.", a: "Dr. [Name]", c: "Ahmedabad" },
              { q: "We wanted our clinic to feel modern without overspending on unnecessary systems. BRYT helped us make balanced decisions that suited our practice.", a: "Dr. [Name]", c: "Surat" },
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

      {/* SECTION 8 — CONSULTATION CTA */}
      <section className="relative overflow-hidden bg-gradient-sea py-20 text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Planning a Dental Clinic?<br />Start With a Clear Conversation.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            Whether you are opening your first clinic, upgrading your setup, or expanding into implant dentistry, our team can help you understand the right direction for your space, workflow, and budget.
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

      {/* SECTION 9 — EDUCATIONAL CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Insights</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Insights for Growing Dental Practices</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            "How to Choose a Dental Chair That Still Feels Right Five Years Later",
            "What Most Dentists Overlook During Clinic Setup Planning",
            "Why Sterilisation Planning Should Be Part of Your Clinic Design From Day One",
          ].map((title, i) => (
            <article key={title} className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40">
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><BookOpen className="h-5 w-5" /></div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Article {i + 1}</div>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">{title}</h3>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <CTASection
        title="Create a Clinic That Feels Professional From the First Patient Visit"
        subtitle="Talk to BRYT Dental Technologies for guidance on equipment selection, clinic setup planning, and long-term dental technology support."
        primaryLabel="Book a Free Consultation"
      />
    </Layout>
  );
}
