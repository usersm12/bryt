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
    tagline: "USA-precision turbines and contra-angles",
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