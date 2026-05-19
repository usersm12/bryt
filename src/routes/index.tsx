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
      { title: "BRYT Dental Technologies — Equip Your Clinic Right From Day One" },
      { name: "description", content: "BRYT Dental Technologies helps dentists across Gujarat and India plan, source, and install modern dental clinics. 500+ clinics equipped. Chairs, handpieces, sterilisation, implants, and complete turnkey setup." },
    ],
  }),
  component: HomePage,
});

const services = [
  { to: "/dental-chairs", icon: Building2, title: "Dental Chairs and Treatment Units", desc: "Modern, ergonomically designed treatment units built for patient comfort and clinical efficiency. If the chair fails, the day stops. We only carry systems that do not fail.", img: chairImg },
  { to: "/handpieces", icon: Stethoscope, title: "Handpieces and Instruments", desc: "Precision instruments engineered with USA-imported components. Your handpiece is the primary tool of your profession. It needs to perform consistently, not occasionally.", img: handpieceImg },
  { to: "/sterilisation", icon: ShieldPlus, title: "Sterilisation and Infection Control", desc: "Autoclaves, UV chambers, and oil-free compressors designed for compliant, reliable infection control. This is not where you cut corners. We make sure you do not have to.", img: sterilImg },
  { to: "/implants", icon: Syringe, title: "Dental Implant Systems", desc: "The EM-3 implant system for clinics ready to expand into implantology. Higher case value. Broader treatment capability. One compact, precise machine to get you there.", img: implantImg },
  { to: "/turnkey", icon: Layers, title: "Turnkey Dental Clinic Setup", desc: "Complete clinic planning, equipment sourcing, delivery, installation, commissioning, and support. One call. One team. One process that handles everything from empty space to opening day.", img: turnkeyImg },
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
              The Equipment Decisions You Make Before You Open Will Either Cost You For Years Or Pay You Back Every Single Day.
            </h1>
            <p className="mt-6 max-w-xl text-base text-navy-foreground/85 sm:text-lg">
              BRYT Dental Technologies helps dentists across Gujarat and India plan, source, and install modern dental clinics. The right chairs. The right instruments. The right sterilisation setup. Coordinated by one experienced team, from first conversation to opening day.
            </p>
            <p className="mt-3 max-w-xl text-base font-medium text-navy-foreground/85">
              We have supported 500+ clinics. We know what works. And we know what dentists regret buying.
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
              500+ Dental Clinics Supported Across India &nbsp;·&nbsp; USA Precision Components &nbsp;·&nbsp; Installation, Commissioning & After-Sales Support
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE REALITY */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">The Reality of Starting a Dental Clinic</span>
          <h2 className="mt-5 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
            Most Dentists Get Their Clinic Setup Wrong. Here Is Why That Happens And How To Avoid It.
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base text-muted-foreground sm:text-lg">
          <p>You spent years mastering dentistry. Nobody trained you to be a procurement specialist, an equipment evaluator, and a project manager simultaneously. But that is exactly what clinic setup demands.</p>
          <p>You have to choose between dental chairs you have never sat in. Evaluate handpieces you have only seen in catalogues. Compare sterilisation specs from three different vendors who all tell you theirs is the best. Coordinate delivery timelines. Manage installation. Handle compliance. Stay within budget. And do all of this while finishing your residency or managing existing patients.</p>
          <p className="font-semibold text-navy">The dentists who get this right are the ones who work with someone who has already made every mistake so they do not have to.</p>
          <p>That is what BRYT is for.</p>
          <p>We are not a catalogue. We are the experienced partner who has equipped 500 clinics, seen what breaks, knows what lasts, and will tell you the truth about what your clinic actually needs.</p>
        </div>
      </section>

      {/* SECTION 3 — WHAT BRYT DOES */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">What BRYT Does</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Every Piece of Technology Your Clinic Needs. None That It Does Not.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We supply a focused, carefully selected range of dental technologies built for one purpose: reliable, long-term clinical performance. Not the most expensive options. Not the cheapest. The ones that will still be working correctly five years from now without becoming a maintenance problem.</p>
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
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">We Have Done This 500 Times. You Are Not a Test Case.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, t: "Guidance That Saves Money", body: "We tell dentists what their clinic needs based on their workflow, space, and patient volume. Not every clinic needs the top-of-the-range setup.", note: "The right setup is the one that performs reliably for years without becoming a cost problem." },
            { icon: Wrench, t: "Technology Chosen for Durability", body: "Our range includes the Lifedent E9 series dental units, handpieces built with USA precision components, and sterilisation systems selected for clinical serviceability.", note: "Technology chosen because it works, not because it sells." },
            { icon: LifeBuoy, t: "Support That Does Not Stop at Delivery", body: "Most vendors disappear after the invoice clears. BRYT handles installation, commissioning, staff guidance, and ongoing after-sales support.", note: "Your clinic running smoothly is the outcome we are responsible for." },
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
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">From Empty Space to Fully Functional Dental Clinic. Coordinated by One Team. Zero Chaos.</h2>
            <p className="mt-4 font-medium text-navy/80">One structured process. One experienced partner. The clarity most dentists spend months trying to find on their own.</p>
            <p className="mt-4 text-muted-foreground">Here is what happens when dentists coordinate their own clinic setup without a turnkey partner:</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Five different quotes from five different vendors, none of whom speak to each other",
                "Equipment arrives at different times. Nothing is ready when the chairs show up",
                "The handpiece brand turns out not to be compatible with the unit they bought",
                "Installation gets delayed because the compressor vendor needs a different power point",
                "Three months later, the clinic opens. Six months later, one system needs servicing and nobody knows who is responsible",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-foreground/85">{p}</span></li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">We eliminate every single one of those problems. The BRYT turnkey process covers planning, equipment guidance, chair and operatory selection, handpiece setup, sterilisation planning, delivery coordination, installation, commissioning, and staff guidance.</p>
            <p className="mt-3 text-sm font-medium text-navy">The goal is not just to set up a clinic. The goal is to set up a clinic that works correctly from day one and continues working correctly long after we leave.</p>
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
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">The Technology Stack Behind Every BRYT Clinic</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We do not carry everything. We carry the right things. Here is what powers the clinics we set up.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={chairImg} alt="Lifedent E9 Series dental unit" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">Lifedent Dental Units — E9 Series</h3>
              <p className="mt-2 text-sm text-muted-foreground">The Lifedent E9 Series is the treatment unit we recommend to most serious practices. 7-inch full-colour touchscreen. Lifesmart electronic control. Dual-joint assistant arm. Multi-functional tubing disinfection. V5 LED surgical lighting at 8,000 to 35,000 LUX. Three programmable doctor positions. 30+ upholstery colours.</p>
              <ul className="mt-3 space-y-1 text-sm text-foreground/80">
                <li>• E9-c — Hanging version for overhead instrument delivery</li>
                <li>• E9-i — Whip-arm version for flexible instrument access</li>
                <li>• E9-t — Cart version for mobile operatory layouts</li>
              </ul>
              <p className="mt-3 text-sm font-medium text-navy">Not the cheapest chair on the market. The one that will still be running without problems in year six.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={handpieceImg} alt="BRYT handpiece series" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">Handpiece Series</h3>
              <p className="mt-2 text-sm text-muted-foreground">Four configurations to match every clinical requirement. Triple spray, single spray latch type, external spray contra, and straight handpieces. Every model built with USA-sourced precision components because your primary instrument cannot be a point of failure mid-procedure.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={sterilImg} alt="Sterilisation systems" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">Sterilisation Systems</h3>
              <p className="mt-2 text-sm text-muted-foreground">Autoclave, UV chamber, and oil-free compressor. Not optional. Not an afterthought. We treat sterilisation planning as a non-negotiable part of every clinic setup because the cost of getting it wrong is not financial. It is clinical.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={implantImg} alt="EM-3 implant machine" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-xl font-bold text-navy">EM-3 Implant Machine</h3>
              <p className="mt-2 text-sm text-muted-foreground">Compact. Precise. Reliable torque control from a footprint that fits any operatory. Implant dentistry is one of the highest-value services a clinic can offer. The EM-3 is the system that lets you deliver it with confidence from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SOCIAL PROOF */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Social Proof</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">500 Clinics Trusted Us With One of the Biggest Decisions of Their Career.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { q: "We were completely lost in the beginning. Multiple vendors, conflicting recommendations, and no clarity on what we actually needed. The BRYT team walked us through everything, helped us make decisions we felt confident about, and delivered exactly what was promised. The clinic opened on schedule. No surprises.", a: "Dr. [Name]", r: "BDS", c: "Rajkot" },
              { q: "I had visited four equipment vendors before speaking to BRYT. Every one of them pushed their most expensive product. BRYT was the first team that asked me what I actually needed and then recommended accordingly. The installation was clean, fast, and the equipment has performed without a single issue since opening.", a: "Dr. [Name]", r: "MDS Prosthodontics", c: "Ahmedabad" },
              { q: "We were upgrading our existing clinic and needed to be careful about budget without compromising on quality. BRYT helped us identify exactly where to invest and where we could save without it affecting the patient experience. That kind of honest guidance is genuinely rare in this industry.", a: "Dr. [Name]", r: "BDS", c: "Surat" },
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

      {/* SECTION 8 — CONSULTATION CTA */}
      <section className="relative overflow-hidden bg-gradient-sea py-20 text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Know Exactly What Your Clinic Needs Before You Spend a Single Rupee.
          </h2>
          <div className="mx-auto mt-5 max-w-2xl space-y-4 text-base text-primary-foreground/85 sm:text-lg">
            <p>Most dentists make their biggest equipment decisions without a complete picture of what they are buying, what it will cost to maintain, and whether it is actually right for their space and workflow.</p>
            <p>A consultation with BRYT costs nothing. It gives you a clear, unbiased view of what your clinic actually needs based on your specialisation, your space, your patient volume, and your budget.</p>
            <p>Whether you are opening your first clinic, upgrading a current setup, or adding implant capabilities, start with a conversation before you commit to any equipment.</p>
          </div>
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
          <h2 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Read Before You Decide</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">These are the questions most dentists wish they had asked before signing an equipment purchase order.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { title: "The Dental Chair You Buy Today Will Still Be in Your Clinic in 2031. Here Is How to Choose the Right One.", body: "Most dentists evaluate chairs on price and appearance. The ones who have been running clinics for five years evaluate them on maintenance history, spare parts availability, and what happens when something breaks." },
            { title: "The Six Things Dentists Consistently Overlook During Clinic Setup Planning.", body: "Sterilisation room size. Compressor placement. Infection control workflow. Power requirements. Spare parts sourcing. After-sales accountability. Every one has derailed a clinic setup that looked perfect on paper." },
            { title: "Why Your Sterilisation Setup Should Be the First Thing You Plan, Not the Last.", body: "Most dentists plan their operatory first, then try to fit sterilisation into whatever space is left. This is the single most common clinic design mistake we see. Here is the correct sequence." },
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

      {/* FOOTER CTA */}
      <CTASection
        title="The Best Time to Get This Right Was Before You Opened. The Second Best Time Is Now."
        subtitle="BRYT Dental Technologies has equipped 500+ clinics across India. If you are planning a new clinic, upgrading your current setup, or expanding into new treatment areas, we can tell you exactly what you need, what you do not, and what will serve your practice for years. No pressure. No sales script. Just the clarity that comes from doing this 500 times."
        primaryLabel="Book a Free Consultation"
      />
    </Layout>
  );
}
