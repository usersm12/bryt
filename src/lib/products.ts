export type Product = {
  slug: string;
  name: string;
  brand?: string;
  category: string; // category slug
  group?: string; // sub-group label (e.g. brand within category)
  description: string;
};

export type ProductGroup = { name: string; products: Product[] };

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  groups: ProductGroup[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .replace(/\*/g, " deg ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function build(
  categorySlug: string,
  groups: { name: string; items: string[] }[],
): ProductGroup[] {
  return groups.map((g) => ({
    name: g.name,
    products: g.items.map((name) => ({
      slug: slugify(`${g.name}-${name}`),
      name,
      brand: g.name,
      group: g.name,
      category: categorySlug,
      description: `${name} from ${g.name} — supplied, installed and serviced by BRYT Dental Technologies with full after-sales support across Gujarat and Pan-India.`,
    })),
  }));
}

export const categories: Category[] = [
  {
    slug: "dental-chair-units",
    name: "Dental Chair Units",
    tagline: "Patient-ready chairs built for daily reliability",
    description:
      "Authorised distribution of Lifedent, Biodent, Diplomat and BRYT chair units — sized for solo practices to multi-chair clinics.",
    groups: build("dental-chair-units", [
      { name: "LIFEDENT", items: ["E9 c", "E9 i", "E9 t", "P3 c", "P3 i", "P3 t", "P3 t Lite"] },
      {
        name: "BIODENT",
        items: ["Bio Deluxe", "Bio Pick", "Bio Elantra", "Bio Jiyu 25", "Bio Tesla", "Bio Kid", "Bio Vegika", "Bio Vision", "Bio Jet20"],
      },
      { name: "DIPLOMAT", items: ["Model One 100", "Model One 200"] },
      { name: "BRYT", items: ["BRYT All-in-One Dental Unit"] },
    ]),
  },
  {
    slug: "radiology",
    name: "Radiology",
    tagline: "Sensors, OPGs and CBCT systems",
    description:
      "From intraoral sensors to 3D CBCT — radiology equipment from Acteon, Vatech, Eighteeth and Fin, with on-site commissioning and calibration.",
    groups: build("radiology", [
      {
        name: "ACTEON",
        items: [
          "Sopix Sensor",
          "U-Sense HD Size 1",
          "U-Sense HD Size 1.5",
          "X-Mind DC X-Ray",
          "C-50 Camera",
          "C-20 Camera",
          "Prime 2D OPG",
          "Prime 3D CBCT",
          "Optima XMO 3D CBCT",
        ],
      },
      {
        name: "VATECH",
        items: ["Ez Classic Sensor 1.5", "EzRay Air Plus", "Smart Plus CBCT", "Green X 12-16-18 CBCT", "Pax-i Plus OPG", "A9 CBCT"],
      },
      { name: "EIGHTEETH", items: ["Nanopix 1", "Nanopix 1.5", "Nanopix E 1.3"] },
      { name: "FIN", items: ["Scan F350 CBCT"] },
    ]),
  },
  {
    slug: "handpieces",
    name: "Handpieces",
    tagline: "UK-precision turbines and contra-angles",
    description:
      "High-speed turbines, contra-angles and straight handpieces from BDC and Galaxy — quiet, balanced and built for long duty cycles.",
    groups: build("handpieces", [
      {
        name: "BDC",
        items: [
          "RD 3M B2 HS PB Turbine",
          "RD 3MG B2 LED HS PB Turbine",
          "RD 1M B2 HS PB Turbine",
          "RD MW B2 Chuck Type HS Turbine",
          "HPPM Low 01 C — Contra",
          "HPPM Low 01 S — Straight",
        ],
      },
      {
        name: "GALAXY",
        items: [
          "Galaxy Contra Angle",
          "Galaxy Straight",
          "Galaxy Standard PB HS Turbine",
          "Galaxy Premium PB HS Turbine",
          "Galaxy Chuck Type HS Turbine",
          "Galaxy 45° PB HS Turbine",
          "Galaxy LED PB HS Turbine",
        ],
      },
    ]),
  },
  {
    slug: "clinical-products",
    name: "Clinical Products",
    tagline: "Endo, implant, sterilisation, scanning & more",
    description:
      "Daily-use clinical equipment across endodontics, implantology, sterilisation, suction, lighting, scanning and operatory infrastructure.",
    groups: build("clinical-products", [
      {
        name: "Endomotor",
        items: [
          "E-Xtreme Endomotor",
          "E-Connect",
          "E-Connect S",
          "E-Connect S+",
          "E-Value",
          "E-Value E",
          "Galaxy Cordless Endomotor",
          "Galaxy Endo+ Apex 2-in-1",
        ],
      },
      { name: "Apex Locator", items: ["Findpex by Eighteeth", "E-Pex", "Airpex Wireless"] },
      { name: "Implant Motor", items: ["EM-3 Implant Motor"] },
      { name: "Diode Laser", items: ["Gigaa Diode Laser"] },
      {
        name: "Ultrasonic Scaler",
        items: [
          "Newtron Booster",
          "Newtron P5 B LED",
          "Newtron P5 XS B LED",
          "Newtron P5 XS Pure",
          "Woodpecker Built-in N2 LED",
          "Woodpecker Built-in N2",
          "Acteon SP 3055 Built-in",
        ],
      },
      { name: "Micromotor", items: ["Marathon 33E", "Galaxy Micromotor"] },
      { name: "Sterilisation", items: ["E-Sanit by Eighteeth", "Tanda", "Life Steriwave"] },
      {
        name: "Light Cure",
        items: ["Curing Pen", "Curing Pen E", "Galaxy Light Cure Wireless", "Galaxy Light Cure Built-in"],
      },
      {
        name: "UV Chamber",
        items: ["Hyperlight G", "Hyperlight M", "Ultramint", "Ultramint Pro"],
      },
      { name: "Centralised Suction Unit", items: ["Duerr VS 250", "Galaxy Ring Blower 0.55W"] },
      {
        name: "LED Operating Light",
        items: [
          "GX 153 6-LED Sensor",
          "GX 0404W 4-LED",
          "GX Open Reflector",
          "GX 8-LED 808 Square",
          "GX 6-LED 606",
          "GX 8-LED Square",
        ],
      },
      {
        name: "Oil Free Compressor",
        items: [
          "Galaxy 1.1 HP Oilless",
          "Galaxy 1.5 HP Oilless",
          "BRYT 1 HP Oilless",
          "BRYT 1.5 HP Oilless",
        ],
      },
      { name: "Centralised Air Compressor", items: ["Central Air Compressor System"] },
      {
        name: "Multi-Purpose Trolley",
        items: ["BRYT 3-Layer Multi-Purpose Trolley", "BRYT Intraoral Scanner Trolley"],
      },
      { name: "Intraoral Scanner", items: ["Helios 500", "Helios 700"] },
      { name: "Ultrasonic Activator", items: ["Ultra-X"] },
      {
        name: "Obturation Device",
        items: ["Fast-Pack Pro", "Fast-Fill", "Space-Pack", "Space-Fill"],
      },
      {
        name: "Dental Loupe",
        items: [
          "Brilliance",
          "Brilliance BP",
          "Brilliance 48°",
          "Brilliance 48° Pro",
          "SoftTouch Wired Headlight",
          "Wireless Z Headlight",
        ],
      },
      { name: "Dental Microscope", items: ["Acuvision X"] },
      { name: "Electric Motor 1:5", items: ["Motor Turbo & E-Asp 1"] },
    ]),
  },
];

export const allProducts: Product[] = categories.flatMap((c) =>
  c.groups.flatMap((g) => g.products),
);

export const brands = [
  "LIFEDENT",
  "ACTEON",
  "VATECH",
  "BIODENT",
  "EIGHTEETH",
  "GALAXY",
  "TEALTH",
  "BDC",
  "WOODPECKER",
  "GIGAA",
  "DIPLOMAT",
  "BRYT",
] as const;

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (categorySlug: string, productSlug: string) =>
  allProducts.find((p) => p.category === categorySlug && p.slug === productSlug);

export type ProductSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  specs?: { label: string; value: string }[];
};

export type ProductDetails = {
  tagline: string;
  intro: string;
  overview?: { label: string; value: string }[];
  techSpecs?: { label: string; value: string }[];
  sections: ProductSection[];
  applications?: { name: string; benefit: string }[];
  advantages?: { feature: string; benefit: string }[];
};

export const productDetails: Record<string, ProductDetails> = {
  "lifedent-e9-c": {
    tagline: "Premium Continental Dental Technology",
    intro:
      "The E9-c Continental Dental Unit combines elegant European-inspired design with intelligent clinical functionality, delivering a sophisticated treatment experience for modern dental practices.",
    sections: [
      {
        heading: "Intelligent Treatment Management",
        body: "Its advanced touchscreen system improves workflow efficiency and simplifies clinical operation.",
        bullets: [
          "7-inch smart touchscreen panel",
          "15 programmable chair positions",
          "Dynamic instrument interlock system",
          "Integrated treatment management",
          "User-friendly digital controls",
        ],
      },
      {
        heading: "Superior Patient Comfort Engineering",
        body: "The E9-c is built to provide smooth positioning and ergonomic support during every procedure.",
        bullets: [
          "Synchronized chair movement",
          "Ergonomic dual-jointed headrest",
          "Wide patient support cushioning",
          "Smooth silent operation",
          "Stable treatment positioning",
        ],
      },
      {
        heading: "Advanced Hygiene Protection",
        body: "Integrated hygiene technologies help clinics maintain high standards of cleanliness and infection control.",
        bullets: [
          "Built-in tubing disinfection system",
          "Easy-clean detachable components",
          "Hygienic integrated waterline system",
          "Simplified maintenance procedures",
          "Efficient clinic sanitation support",
        ],
      },
      {
        heading: "Professional Illumination Performance",
        body: "The V5 LED operating light enhances visibility for precise and comfortable treatment procedures.",
        bullets: [
          "Bright shadow-free illumination",
          "Adjustable light intensity",
          "Natural daylight lighting effect",
          "Wide treatment coverage",
          "Reduced eye fatigue support",
        ],
      },
      {
        heading: "Designed for High-End Clinics",
        body: "The E9-c is ideal for premium dental practices seeking modern aesthetics, intelligent technology, and reliable long-term performance.",
        bullets: [
          "Elegant continental-style appearance",
          "Durable premium construction",
          "Supports advanced dental procedures",
          "Efficient integrated workflow",
          "Professional clinic enhancement",
        ],
      },
    ],
  },
  "lifedent-e9-i": {
    tagline: "Intelligent Clinical Control",
    intro:
      "The E9-i International Dental Unit is engineered for advanced dental environments that require intelligent workflow management, precision operation, and elevated patient comfort. Equipped with a modern touchscreen control interface, the system allows dentists to manage chair positions, lighting, hygiene functions, and treatment settings effortlessly.",
    sections: [
      {
        heading: "Advanced Smart Features",
        bullets: [
          "7-inch intelligent touchscreen interface",
          "15 programmable chair memory positions",
          "Dynamic instrument interlock system",
          "Integrated digital workflow controls",
          "User-friendly operational interface",
        ],
      },
      {
        heading: "Exceptional Patient Comfort",
        body: "Designed to improve the patient experience during long procedures, the E9-i features synchronized chair movement and ergonomic cushioning that reduce discomfort while ensuring smooth positioning.",
        bullets: [
          "Dual-jointed ergonomic headrest",
          "Ultra-smooth synchronized chair movement",
          "Wide patient support cushioning",
          "Silent chair operation system",
          "Stable positioning technology",
        ],
      },
      {
        heading: "Professional Hygiene Management",
        body: "The E9-i incorporates advanced hygiene technologies that support modern infection-control standards and simplify clinic maintenance.",
        bullets: [
          "Built-in tubing disinfection system",
          "300 rewritable disinfection records",
          "Easy-clean detachable ceramic spittoon",
          "Hygienic integrated waterline system",
          "Simplified maintenance access",
        ],
      },
      {
        heading: "High-Performance Clinical Lighting",
        body: "The integrated V5 LED operating light delivers bright, shadow-free illumination for improved treatment precision and visibility.",
        bullets: [
          "Natural daylight-style illumination",
          "Adjustable brightness settings",
          "Reduced operator eye fatigue",
          "Wide-angle lighting coverage",
          "Energy-efficient LED performance",
        ],
      },
      {
        heading: "Designed for Modern Dental Clinics",
        body: "The E9-i combines elegant aesthetics with durable construction, making it suitable for premium clinics focused on performance, technology, and patient satisfaction.",
        bullets: [
          "Modern international-style appearance",
          "Durable long-term construction",
          "Space-efficient integrated design",
          "Supports multi-procedure treatments",
          "Ideal for high-volume practices",
        ],
      },
    ],
  },
  "lifedent-e9-t": {
    tagline: "Flexible Cart-Based Treatment System",
    intro:
      "The E9-t Cart-Version Dental Unit is designed for clinics that require greater flexibility and mobility during treatment procedures. Its adjustable cart configuration allows doctors to customize positioning for improved workflow efficiency and convenience.",
    sections: [
      {
        heading: "Smart Clinical Technology",
        body: "The integrated touchscreen system simplifies treatment management and enhances operational accuracy throughout procedures.",
        bullets: [
          "7-inch intelligent touchscreen panel",
          "15 programmable chair positions",
          "Dynamic instrument interlock technology",
          "Digital treatment management system",
          "Simplified workflow controls",
        ],
      },
      {
        heading: "Adjustable Mobility & Ergonomics",
        body: "The movable cart structure enables better accessibility and smoother operation in multi-doctor or compact clinical environments.",
        bullets: [
          "Adjustable cart height (75–90 cm)",
          "Flexible treatment positioning",
          "Ergonomic doctor accessibility",
          "Space-saving operational design",
          "Comfortable treatment workflow",
        ],
      },
      {
        heading: "Enhanced Patient Experience",
        body: "The E9-t is designed to improve patient comfort through stable positioning and ergonomic support systems.",
        bullets: [
          "Synchronized chair movement",
          "Ergonomic dual-jointed headrest",
          "Wide patient support design",
          "Smooth and silent operation",
          "Relaxed treatment positioning",
        ],
      },
      {
        heading: "Advanced Hygiene & Maintenance",
        body: "Built-in hygiene systems support infection control while simplifying daily clinic cleaning procedures.",
        bullets: [
          "Integrated tubing disinfection system",
          "Easy-clean treatment surfaces",
          "Detachable hygienic components",
          "Durable stainless steel assistant tray",
          "Efficient maintenance accessibility",
        ],
      },
      {
        heading: "Premium Clinical Performance",
        body: "The E9-t combines mobility, technology, and sophisticated aesthetics to support modern dental clinics seeking flexibility without compromising functionality.",
        bullets: [
          "High-performance V5 LED light",
          "Durable premium construction",
          "Modern contemporary appearance",
          "Ideal for advanced treatments",
          "Suitable for growing practices",
        ],
      },
    ],
  },
  "lifedent-p3-c": {
    tagline: "Reliable Everyday Clinical Performance",
    intro:
      "The P3-c Continental Dental Unit is built for daily dental procedures, offering dependable functionality, ergonomic comfort, and efficient treatment workflows. Its durable design ensures consistent performance in busy dental environments.",
    sections: [
      {
        heading: "Comfortable Ergonomic Design",
        body: "The unit prioritizes patient relaxation and operator convenience through carefully engineered ergonomic support systems.",
        bullets: [
          "Ultra-low 380 mm chair position",
          "Wide ergonomic patient cushion",
          "Soft-start chair movement system",
          "Comfortable positioning support",
          "Stable treatment experience",
        ],
      },
      {
        heading: "Precision Chair Technology",
        body: "Advanced positioning technology improves treatment efficiency while enabling smooth and accurate chair adjustments.",
        bullets: [
          "Angle sensor positioning system",
          "Programmable chair memory settings",
          "Smooth synchronized movement",
          "Quiet operational performance",
          "Stable chair positioning accuracy",
        ],
      },
      {
        heading: "Professional Treatment Illumination",
        body: "The integrated V3 LED operating light provides clear visibility during procedures for improved clinical precision.",
        bullets: [
          "Bright shadow-free illumination",
          "Adjustable lighting intensity",
          "Energy-efficient LED technology",
          "Reduced eye strain support",
          "Wide-area treatment visibility",
        ],
      },
      {
        heading: "Durable Hygienic Construction",
        body: "The P3-c is manufactured using durable materials designed for long-term clinical reliability and easy maintenance.",
        bullets: [
          "Aluminum casting backrest",
          "Detachable ceramic spittoon",
          "Easy-clean treatment surfaces",
          "Hygienic integrated components",
          "Long-lasting structural durability",
        ],
      },
      {
        heading: "Ideal for Modern Dental Clinics",
        body: "The P3-c delivers a balanced combination of affordability, reliability, and patient comfort for general dentistry applications.",
        bullets: [
          "Suitable for daily procedures",
          "Compact clinical integration",
          "Efficient operational workflow",
          "Professional modern appearance",
          "Reliable long-term investment",
        ],
      },
    ],
  },
  "lifedent-p3-i": {
    tagline: "Affordable Professional Dental Solution",
    intro:
      "The P3-i International Dental Unit is designed for clinics seeking dependable performance, ergonomic comfort, and professional functionality at an accessible investment level.",
    sections: [
      {
        heading: "Enhanced Patient Comfort System",
        body: "Every component of the P3-i is engineered to improve treatment comfort and create a more relaxed patient experience.",
        bullets: [
          "Ultra-low 380 mm chair position",
          "Wide ergonomic patient support",
          "Soft-start movement technology",
          "Stable synchronized positioning",
          "Comfortable headrest adjustment",
        ],
      },
      {
        heading: "Intelligent Positioning Technology",
        body: "The integrated angle sensor system enhances operational accuracy and simplifies treatment positioning.",
        bullets: [
          "Precision angle sensor controls",
          "Smooth chair memory function",
          "Stable treatment adjustments",
          "Quiet operational performance",
          "Easy positioning management",
        ],
      },
      {
        heading: "Efficient Clinical Lighting",
        body: "The V3 LED operating light improves treatment visibility and clinical accuracy.",
        bullets: [
          "Natural daylight illumination",
          "Wide-angle lighting coverage",
          "Reduced shadow formation",
          "Adjustable brightness control",
          "Energy-efficient operation",
        ],
      },
      {
        heading: "Practical Hygiene & Maintenance",
        body: "Designed for everyday dental use, the P3-i simplifies cleaning and maintenance procedures.",
        bullets: [
          "Detachable ceramic spittoon",
          "Easy-clean treatment surfaces",
          "Durable integrated components",
          "Hygienic workflow support",
          "Reliable maintenance accessibility",
        ],
      },
      {
        heading: "Built for Modern Practices",
        body: "The P3-i offers a clean international-style appearance combined with dependable clinical performance for modern dental environments.",
        bullets: [
          "Contemporary clinic aesthetics",
          "Durable construction quality",
          "Efficient workflow integration",
          "Suitable for multiple procedures",
          "Excellent value-for-money solution",
        ],
      },
    ],
  },
  "lifedent-p3-t": {
    tagline: "Intelligent Clinical Workflow",
    intro:
      "The Lifedent P3-t Dental Unit is designed to simplify modern dental procedures through intelligent controls, ergonomic workflow optimization, and flexible clinical functionality. Its smart operating system enhances treatment efficiency while supporting comfortable day-to-day operation for dental professionals.",
    sections: [
      {
        heading: "Smart Operating System",
        bullets: [
          "Intelligent linkage control system",
          "One-touch operation management",
          "3 personalized doctor programs",
          "15 programmable memory positions",
          "Integrated doctor & assistant controls",
        ],
      },
      {
        heading: "Flexible Cart-Version Design",
        body: "The P3-t features a cart-style delivery system that provides greater flexibility, accessibility, and adaptability for different treatment procedures and clinic layouts.",
        bullets: [
          "Adjustable cart height system",
          "Smooth mobile instrument positioning",
          "Space-saving ergonomic structure",
          "Silent high-quality caster wheels",
          "Flexible treatment accessibility",
        ],
      },
      {
        heading: "Superior Patient Comfort System",
        body: "Every component of the P3-t is engineered to improve patient relaxation and ensure a smoother treatment experience during long dental procedures.",
        bullets: [
          "Ultra-low 380 mm chair position",
          "Soft-start movement technology",
          "Ultra-thin ergonomic backrest",
          "Stable synchronized chair movement",
          "Comfortable long-duration support",
        ],
      },
      {
        heading: "Intelligent Positioning Technology",
        body: "The integrated positioning system enhances operational precision while allowing smoother and more efficient chair adjustments throughout treatments.",
        bullets: [
          "Precision memory position controls",
          "Smooth chair adjustment system",
          "Stable treatment positioning",
          "Quiet operational performance",
          "Easy positioning management",
        ],
      },
      {
        heading: "Efficient Clinical Lighting",
        body: "The V2 LED operating light delivers bright and accurate illumination for enhanced visibility and improved treatment precision.",
        bullets: [
          "Natural daylight illumination",
          "Wide-angle lighting coverage",
          "Reduced shadow formation",
          "Contactless brightness adjustment",
          "Energy-efficient LED operation",
        ],
      },
      {
        heading: "Advanced Hygiene & Maintenance",
        body: "Designed for modern clinical environments, the P3-t supports efficient cleaning, infection control, and simplified maintenance procedures.",
        bullets: [
          "Optional tubing disinfection system",
          "Detachable ceramic spittoon",
          "Easy-clean treatment surfaces",
          "Removable suction components",
          "Hygienic workflow support",
        ],
      },
      {
        heading: "Humanized Functional Design",
        body: "The P3-t combines intelligent engineering with practical daily usability to improve workflow convenience for dentists and assistants.",
        bullets: [
          "Multifunctional foot control system",
          "Independent 2-liter water bottle",
          "Optional dynamic water heating",
          "Easy-access assistant tray system",
          "Integrated drainage functionality",
        ],
      },
      {
        heading: "Built for Modern Dental Clinics",
        body: "The P3-t combines modern aesthetics, ergonomic flexibility, and reliable performance to meet the demands of contemporary dental practices.",
        bullets: [
          "Contemporary clinic aesthetics",
          "Durable construction quality",
          "Flexible workflow integration",
          "Suitable for multiple procedures",
          "Professional high-performance design",
        ],
      },
    ],
  },
  "lifedent-p3-t-lite": {
    tagline: "Compact & Efficient Dental Solution",
    intro:
      "The P3-t Lite Dental Unit is designed for clinics that require a streamlined, space-saving treatment system without sacrificing professional functionality or patient comfort.",
    sections: [
      {
        heading: "Modern Minimalist Design",
        body: "Its sleek and contemporary appearance helps clinics maintain a clean, professional, and modern treatment environment.",
        bullets: [
          "Compact integrated structure",
          "Elegant modern aesthetics",
          "Space-efficient configuration",
          "Professional treatment appearance",
          "Simplified operational layout",
        ],
      },
      {
        heading: "Everyday Clinical Convenience",
        body: "The P3-t Lite supports efficient day-to-day dental procedures with practical functionality and ergonomic workflow optimization.",
        bullets: [
          "Easy-access instrument positioning",
          "Comfortable treatment workflow",
          "Smooth operational controls",
          "Simplified treatment management",
          "Reliable daily performance",
        ],
      },
      {
        heading: "Comfortable Patient Experience",
        body: "The unit is engineered to support patient comfort during general dental treatments.",
        bullets: [
          "Ergonomic patient positioning",
          "Stable chair movement system",
          "Comfortable support structure",
          "Relaxed treatment environment",
          "Smooth operational performance",
        ],
      },
      {
        heading: "Easy Hygiene & Maintenance",
        body: "Designed for practical clinical use, the P3-t Lite simplifies cleaning procedures and supports hygienic operation.",
        bullets: [
          "Easy-clean treatment surfaces",
          "Durable maintenance-friendly materials",
          "Simplified cleaning accessibility",
          "Hygienic integrated components",
          "Reliable long-term usability",
        ],
      },
      {
        heading: "Ideal for Growing Clinics",
        body: "The P3-t Lite is an excellent choice for clinics seeking a compact, reliable, and cost-effective dental treatment unit.",
        bullets: [
          "Ideal for compact spaces",
          "Efficient workflow optimization",
          "Professional everyday functionality",
          "Durable long-term performance",
          "Excellent operational value",
        ],
      },
    ],
  },
  "bdc-rd-3m-b2-hs-pb-turbine": {
    tagline: "High-Speed Precision. Smooth Cutting. Reliable Everyday Performance.",
    intro:
      "The BDC RD 3M B2 HS PB Turbine is a high-speed air turbine handpiece engineered for precision cutting, smooth rotation, and dependable clinical performance. Designed with a universal B2 2-hole connection, ceramic ball bearings, push-button chuck system, and triple water spray, this turbine delivers efficient cutting power with excellent operator control — built for routine restorative and prosthodontic procedures in a lightweight stainless steel body.",
    overview: [
      { label: "Model", value: "RD-3M-B2" },
      { label: "Type", value: "High-Speed Air Turbine Handpiece" },
      { label: "Connection Type", value: "B2 2-Hole Universal Coupling" },
      { label: "Chuck System", value: "Push-Button" },
      { label: "Bearing Type", value: "Ceramic Ball Bearings" },
      { label: "Spray System", value: "Triple Internal Water Spray" },
      { label: "Body Material", value: "Stainless Steel" },
      { label: "Lighting", value: "LED Illumination" },
      { label: "Application", value: "High-Speed Restorative & General Dentistry" },
    ],
    techSpecs: [
      { label: "Connection Type", value: "B2 Series (2-Hole Universal)" },
      { label: "Chuck Mechanism", value: "Push-Button Chuck" },
      { label: "Bur Compatibility", value: "FG Burs Ø 1.6 mm" },
      { label: "Bearing Type", value: "Ceramic Ball Bearings" },
      { label: "Spray System", value: "3-Water Internal Spray" },
      { label: "Speed Range", value: "350,000 – 450,000 RPM" },
      { label: "Working Pressure", value: "0.22 – 0.30 MPa" },
      { label: "Weight", value: "Approx. 63–69 g" },
      { label: "Body Material", value: "Stainless Steel" },
      { label: "Illumination", value: "LED Head Light" },
      { label: "Sterilization", value: "Fully Autoclavable" },
    ],
    sections: [
      {
        heading: "High-Speed Cutting Performance",
        body: "Designed for fast and efficient tooth preparation, the turbine operates at speeds up to 450,000 RPM for smooth and controlled cutting performance.",
        bullets: [
          "Faster cutting efficiency",
          "Reduced chair time per procedure",
          "Smooth enamel and dentin preparation",
          "Consistent rotational stability at high load",
        ],
      },
      {
        heading: "Push-Button Chuck System",
        body: "The push-button chuck mechanism allows quick and secure bur replacement without additional tools — simplifying instrument handling during busy sessions.",
        bullets: [
          "One-handed operation for faster bur changes",
          "Secure bur locking for stable clinical performance",
          "Tool-free replacement improves workflow efficiency",
        ],
      },
      {
        heading: "Ceramic Ball Bearings",
        body: "Equipped with ceramic bearings engineered for smoother operation and an extended service life compared to standard steel bearings.",
        bullets: [
          "Reduced friction and lower heat generation",
          "Smoother rotation under sustained load",
          "Improved durability and longer operational lifespan",
          "Quieter, more stable performance throughout procedures",
        ],
      },
      {
        heading: "Triple Internal Water Spray",
        body: "The integrated 3-water spray system provides effective and uniform cooling throughout high-speed procedures.",
        bullets: [
          "Better cooling efficiency at the cutting site",
          "Reduced thermal stress on tooth structure",
          "Improved patient comfort during preparation",
          "Clearer operative field for improved visibility",
        ],
      },
      {
        heading: "LED Illumination",
        body: "Integrated LED lighting delivers direct illumination at the working area for improved accuracy, even in posterior regions.",
        bullets: [
          "Head-mounted LED for shadow-free visibility",
          "Improved procedural accuracy",
          "Enhanced detail recognition in difficult-access areas",
        ],
      },
      {
        heading: "Universal B2 Compatibility",
        body: "The B2 2-hole connection offers broad compatibility with a wide range of dental unit brands and systems.",
        bullets: [
          "Compatible with KaVo, NSK, Sirona, and W&H",
          "Works with standard 4-hole dental units",
          "Easy integration without additional adapters or tools",
        ],
      },
      {
        heading: "Durable Stainless Steel Construction",
        body: "Constructed from corrosion-resistant stainless steel for long-term reliability and repeated sterilization cycles.",
        bullets: [
          "Rust-resistant body with strong structural integrity",
          "Fully autoclavable at standard sterilization cycles",
          "Designed for dependable high-volume daily use",
        ],
      },
    ],
    applications: [
      { name: "Tooth Preparation", benefit: "Crown & bridge preparation" },
      { name: "Caries Removal", benefit: "Efficient cavity excavation" },
      { name: "Enameloplasty", benefit: "Smooth enamel reshaping" },
      { name: "Restorative Dentistry", benefit: "Precise restorative preparation" },
      { name: "Prosthodontics", benefit: "Crown and bridge adjustments" },
      { name: "General Dentistry", benefit: "Routine high-speed procedures" },
    ],
    advantages: [
      { feature: "Push-Button Chuck", benefit: "Fast one-handed bur changes" },
      { feature: "Ceramic Bearings", benefit: "Smoother rotation & longer service life" },
      { feature: "350K–450K RPM", benefit: "Efficient, controlled cutting performance" },
      { feature: "Triple Water Spray", benefit: "Better cooling & clearer operative field" },
      { feature: "LED Illumination", benefit: "Enhanced precision in all areas" },
      { feature: "B2 Universal Coupling", benefit: "Broad compatibility across systems" },
      { feature: "Stainless Steel Body", benefit: "Durable & corrosion-resistant" },
      { feature: "Fully Autoclavable", benefit: "Reliable sterilization support" },
    ],
  },
};

export const getProductDetails = (slug: string) => productDetails[slug];