import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import brytLogo from "@/assets/bryt-logo.png";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        {/* Logo + tagline */}
        <div>
          {/* White pill behind logo so it reads on the dark navy background */}
          <div className="inline-block rounded-xl bg-white px-4 py-2">
            <img src={brytLogo} alt="BRYT Dental Technologies" className="h-12 w-auto" />
          </div>
          <p className="mt-4 text-sm text-navy-foreground/70">
            Your Dental Technologist. Precision equipment, expert guidance, and end-to-end clinic solutions.
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Products</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            <li><Link to="/products/$category" params={{ category: "dental-chair-units" }} className="hover:text-sea-light">Dental Chair Units</Link></li>
            <li><Link to="/products/$category" params={{ category: "radiology" }} className="hover:text-sea-light">Radiology</Link></li>
            <li><Link to="/products/$category" params={{ category: "handpieces" }} className="hover:text-sea-light">Handpieces</Link></li>
            <li><Link to="/products/$category" params={{ category: "clinical-products" }} className="hover:text-sea-light">Clinical Products</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            <li><Link to="/brands" className="hover:text-sea-light">Brands</Link></li>
            <li><Link to="/turnkey" className="hover:text-sea-light">Turnkey Clinic Setup</Link></li>
            <li><Link to="/contact" className="hover:text-sea-light">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Visit / Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sea-light" /> Rajkot, Gujarat, India</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-sea-light" /> +91 97278 06997</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-sea-light" /> brytdental@gmail.com</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-sea transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-sea transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>© 2025 BRYT Dental Technologies. All rights reserved.</p>
          <p>www.brytdental.com</p>
        </div>
      </div>
    </footer>
  );
}
