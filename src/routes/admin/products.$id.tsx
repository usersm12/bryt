import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import {
  dbGetProductBySlug,
  dbCreateProduct,
  dbUpdateProduct,
  dbListCategories,
  dbListGroups,
  type DbProduct,
  type ProductInput,
  type DbCategory,
} from "@/lib/db.server";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";

// ─── Server functions ─────────────────────────────────────────────────────────

const getProduct = createServerFn({ method: "GET" })
  .validator((d: unknown) => d as { id: string })
  .handler(async ({ data }) => {
    const [product, categories] = await Promise.all([
      dbGetProductBySlug(data.id),
      dbListCategories(),
    ]);
    return { product, categories };
  });

const getNew = createServerFn({ method: "GET" }).handler(async () => {
  const categories = await dbListCategories();
  return { product: null as DbProduct | null, categories };
});

const getGroupsForCategory = createServerFn({ method: "GET" })
  .validator((d: unknown) => d as { categorySlug: string })
  .handler(async ({ data }) => dbListGroups(data.categorySlug));

const saveProduct = createServerFn({ method: "POST" })
  .validator(
    (d: unknown) =>
      d as { isNew: boolean; originalSlug?: string; data: ProductInput },
  )
  .handler(async ({ data }) => {
    if (data.isNew) {
      await dbCreateProduct(data.data);
    } else {
      await dbUpdateProduct(data.originalSlug!, data.data);
    }
    return { ok: true };
  });


// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin/products/$id")({
  loader: async ({ params }) => {
    if (params.id === "new") return getNew();
    const result = await getProduct({ data: { id: params.id } });
    if (!result.product) throw notFound();
    return result;
  },
  component: ProductEditPage,
  notFoundComponent: () => (
    <div className="p-8 text-center text-slate-500">
      Product not found.{" "}
      <Link to="/admin/products" className="text-primary underline">
        Back to products
      </Link>
    </div>
  ),
});

// ─── Field types ──────────────────────────────────────────────────────────────

type KVPair = { label: string; value: string };
type ProductSection = {
  heading: string;
  body: string;
  bullets: string[];
};
type Application = { name: string; benefit: string };
type Advantage = { feature: string; benefit: string };

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeJSON<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

// ─── Small reusable components ────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-slate-700">{children}</label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-display text-base font-bold text-navy">{title}</h2>
      {children}
    </div>
  );
}

// ─── KV Pair editor (used for overview + tech specs) ─────────────────────────

function KVEditor({
  pairs,
  onChange,
  labelPlaceholder = "Label",
  valuePlaceholder = "Value",
}: {
  pairs: KVPair[];
  onChange: (pairs: KVPair[]) => void;
  labelPlaceholder?: string;
  valuePlaceholder?: string;
}) {
  function update(i: number, field: keyof KVPair, val: string) {
    const next = pairs.map((p, idx) => (idx === i ? { ...p, [field]: val } : p));
    onChange(next);
  }
  function remove(i: number) {
    onChange(pairs.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...pairs, { label: "", value: "" }]);
  }

  return (
    <div className="space-y-2">
      {pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={pair.label}
            onChange={(v) => update(i, "label", v)}
            placeholder={labelPlaceholder}
            className="flex-1"
          />
          <Input
            value={pair.value}
            onChange={(v) => update(i, "value", v)}
            placeholder={valuePlaceholder}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="rounded p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
      >
        <Plus className="h-3 w-3" /> Add row
      </button>
    </div>
  );
}

// ─── Sections editor ──────────────────────────────────────────────────────────

function SectionsEditor({
  sections,
  onChange,
}: {
  sections: ProductSection[];
  onChange: (s: ProductSection[]) => void;
}) {
  function updateSection(i: number, field: keyof ProductSection, val: string | string[]) {
    const next = sections.map((s, idx) => (idx === i ? { ...s, [field]: val } : s));
    onChange(next);
  }
  function removeSection(i: number) {
    onChange(sections.filter((_, idx) => idx !== i));
  }
  function addSection() {
    onChange([...sections, { heading: "", body: "", bullets: [""] }]);
  }
  function updateBullet(si: number, bi: number, val: string) {
    const bullets = sections[si].bullets.map((b, idx) => (idx === bi ? val : b));
    updateSection(si, "bullets", bullets);
  }
  function addBullet(si: number) {
    updateSection(si, "bullets", [...sections[si].bullets, ""]);
  }
  function removeBullet(si: number, bi: number) {
    updateSection(si, "bullets", sections[si].bullets.filter((_, idx) => idx !== bi));
  }

  return (
    <div className="space-y-4">
      {sections.map((section, si) => (
        <div key={si} className="rounded-lg border border-slate-200 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <Input
                value={section.heading}
                onChange={(v) => updateSection(si, "heading", v)}
                placeholder="Section heading"
              />
              <Textarea
                value={section.body}
                onChange={(v) => updateSection(si, "body", v)}
                placeholder="Section body text (optional)"
                rows={2}
              />
            </div>
            <button
              type="button"
              onClick={() => removeSection(si)}
              className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="pl-2 border-l-2 border-slate-100 space-y-2">
            <div className="text-xs font-medium text-slate-500">Bullet points</div>
            {section.bullets.map((bullet, bi) => (
              <div key={bi} className="flex gap-2">
                <Input
                  value={bullet}
                  onChange={(v) => updateBullet(si, bi, v)}
                  placeholder={`Bullet ${bi + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeBullet(si, bi)}
                  className="rounded p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBullet(si)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary"
            >
              <Plus className="h-3 w-3" /> Add bullet
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
      >
        <Plus className="h-3 w-3" /> Add feature section
      </button>
    </div>
  );
}

// ─── Applications editor ──────────────────────────────────────────────────────

function ApplicationsEditor({
  items,
  onChange,
}: {
  items: Application[];
  onChange: (items: Application[]) => void;
}) {
  function update(i: number, field: keyof Application, val: string) {
    onChange(items.map((a, idx) => (idx === i ? { ...a, [field]: val } : a)));
  }
  return (
    <KVEditor
      pairs={items.map((a) => ({ label: a.name, value: a.benefit }))}
      onChange={(pairs) => onChange(pairs.map((p) => ({ name: p.label, benefit: p.value })))}
      labelPlaceholder="Application name (e.g. Tooth Preparation)"
      valuePlaceholder="Benefit (e.g. Crown & bridge prep)"
    />
  );
}

// ─── Advantages editor ────────────────────────────────────────────────────────

function AdvantagesEditor({
  items,
  onChange,
}: {
  items: Advantage[];
  onChange: (items: Advantage[]) => void;
}) {
  return (
    <KVEditor
      pairs={items.map((a) => ({ label: a.feature, value: a.benefit }))}
      onChange={(pairs) =>
        onChange(pairs.map((p) => ({ feature: p.label, benefit: p.value })))
      }
      labelPlaceholder="Feature (e.g. Push-Button Chuck)"
      valuePlaceholder="Benefit (e.g. Fast one-handed bur changes)"
    />
  );
}

// ─── Image uploader (URL-based) ───────────────────────────────────────────────

function ImageUploader({
  imageUrl,
  onUrlChange,
}: {
  imageUrl: string;
  onUrlChange: (url: string) => void;
}) {
  return (
    <div className="space-y-3">
      {imageUrl && (
        <div className="h-40 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <img src={imageUrl} alt="Product" className="h-full w-full object-contain" />
        </div>
      )}
      <div>
        <Label>Image URL</Label>
        <Input
          value={imageUrl}
          onChange={onUrlChange}
          placeholder="https://example.com/image.jpg"
        />
        <p className="mt-1 text-xs text-slate-400">
          Upload your image to Imgur, Cloudinary, or any host and paste the URL here.
        </p>
      </div>
    </div>
  );
}

// ─── Main product form ────────────────────────────────────────────────────────

function ProductEditPage() {
  const { product, categories } = Route.useLoaderData();
  const params = Route.useParams();
  const isNew = params.id === "new";
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Basic fields
  const [name, setName] = useState(product?.name ?? "");
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [categorySlug, setCategorySlug] = useState(product?.category_slug ?? categories[0]?.slug ?? "");
  const [groupName, setGroupName] = useState(product?.group_name ?? "");
  const [groupOptions, setGroupOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!categorySlug) return;
    getGroupsForCategory({ data: { categorySlug } }).then((groups) =>
      setGroupOptions(groups.map((g) => g.name)),
    );
  }, [categorySlug]);
  const [description, setDescription] = useState(product?.description ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [autoSlug, setAutoSlug] = useState(isNew);

  // SEO / detail fields
  const [tagline, setTagline] = useState(product?.tagline ?? "");
  const [intro, setIntro] = useState(product?.intro ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");

  // Structured fields
  const [overview, setOverview] = useState<KVPair[]>(
    safeJSON(product?.overview ?? "[]", []),
  );
  const [techSpecs, setTechSpecs] = useState<KVPair[]>(
    safeJSON(product?.tech_specs ?? "[]", []),
  );
  const [sections, setSections] = useState<ProductSection[]>(
    safeJSON(product?.sections ?? "[]", []),
  );
  const [applications, setApplications] = useState<Application[]>(
    safeJSON(product?.applications ?? "[]", []),
  );
  const [advantages, setAdvantages] = useState<Advantage[]>(
    safeJSON(product?.advantages ?? "[]", []),
  );

  // Auto-generate slug from name
  function handleNameChange(v: string) {
    setName(v);
    if (autoSlug) {
      setSlug(slugify(`${groupName || brand}-${v}`));
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveProduct({
        data: {
          isNew,
          originalSlug: product?.slug,
          data: {
            slug,
            name,
            brand,
            category_slug: categorySlug,
            group_name: groupName,
            description,
            tagline,
            intro,
            image_url: imageUrl,
            overview: JSON.stringify(overview),
            tech_specs: JSON.stringify(techSpecs),
            sections: JSON.stringify(sections),
            applications: JSON.stringify(applications),
            advantages: JSON.stringify(advantages),
          },
        },
      });
      router.navigate({ to: "/admin/products" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const selectedCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <form onSubmit={handleSave}>
      {/* Page header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-display text-lg font-bold text-navy">
              {isNew ? "New Product" : `Edit: ${product?.name}`}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Link
              to="/admin/products"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? "Saving…" : isNew ? "Create Product" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-6 p-8 lg:grid-cols-3">
        {/* Left column — main fields */}
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Basic Information">
            <div className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. RD 3M B2 HS PB Turbine"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Brand</Label>
                  <Input value={brand} onChange={setBrand} placeholder="e.g. BDC" />
                </div>
                <div>
                  <Label>Group / Series</Label>
                  <select
                    value={groupOptions.includes(groupName) ? groupName : "__custom__"}
                    onChange={(e) => {
                      if (e.target.value !== "__custom__") setGroupName(e.target.value);
                      else setGroupName("");
                    }}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {groupOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                    <option value="__custom__">+ Custom group…</option>
                  </select>
                  {(!groupOptions.includes(groupName) || groupOptions.length === 0) && (
                    <Input
                      value={groupName}
                      onChange={setGroupName}
                      placeholder="e.g. BDC"
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
              <div>
                <Label>Category *</Label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Short Description (for product cards & SEO fallback)</Label>
                <Textarea
                  value={description}
                  onChange={setDescription}
                  placeholder="One sentence description for product listing cards"
                  rows={2}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>URL Slug *</Label>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoSlug(!autoSlug);
                      if (!autoSlug) setSlug(slugify(`${groupName || brand}-${name}`));
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    {autoSlug ? "Manual" : "Auto-generate"}
                  </button>
                </div>
                <Input
                  value={slug}
                  onChange={(v) => { setSlug(v); setAutoSlug(false); }}
                  placeholder="product-url-slug"
                  className="font-mono text-xs"
                />
                <p className="mt-1 text-xs text-slate-400">
                  /products/{categorySlug}/{slug || "…"}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Rich Product Details">
            <p className="mb-4 text-xs text-slate-500">
              These appear on the individual product page. Leave empty to use the short description only.
            </p>
            <div className="space-y-4">
              <div>
                <Label>Tagline (bold subtitle on product page)</Label>
                <Input
                  value={tagline}
                  onChange={setTagline}
                  placeholder="e.g. High-Speed Precision. Smooth Cutting."
                />
              </div>
              <div>
                <Label>Introduction Paragraph (also used as SEO meta description)</Label>
                <Textarea
                  value={intro}
                  onChange={setIntro}
                  placeholder="2–3 sentence product introduction…"
                  rows={4}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Product Overview Table">
            <p className="mb-3 text-xs text-slate-500">
              Key product details shown in a two-column table (e.g. Model, Type, Connection Type).
            </p>
            <KVEditor
              pairs={overview}
              onChange={setOverview}
              labelPlaceholder="Parameter (e.g. Type)"
              valuePlaceholder="Value (e.g. High-Speed Air Turbine)"
            />
          </SectionCard>

          <SectionCard title="Technical Specifications">
            <p className="mb-3 text-xs text-slate-500">
              Precise technical specs shown in a table (e.g. Speed Range, Working Pressure, Weight).
            </p>
            <KVEditor
              pairs={techSpecs}
              onChange={setTechSpecs}
              labelPlaceholder="Spec name (e.g. Speed Range)"
              valuePlaceholder="Spec value (e.g. 350,000 – 450,000 RPM)"
            />
          </SectionCard>

          <SectionCard title="Key Feature Sections">
            <p className="mb-3 text-xs text-slate-500">
              Each section has a heading, optional body text, and bullet points. These render as cards on the product page.
            </p>
            <SectionsEditor sections={sections} onChange={setSections} />
          </SectionCard>

          <SectionCard title="Clinical Applications">
            <p className="mb-3 text-xs text-slate-500">
              What procedures is this used for? Each row is an application + benefit.
            </p>
            <ApplicationsEditor items={applications} onChange={setApplications} />
          </SectionCard>

          <SectionCard title="Key Advantages">
            <p className="mb-3 text-xs text-slate-500">
              Shown as a comparison table: Feature → Benefit.
            </p>
            <AdvantagesEditor items={advantages} onChange={setAdvantages} />
          </SectionCard>
        </div>

        {/* Right column — image + meta */}
        <div className="space-y-6">
          <SectionCard title="Product Image">
            <ImageUploader imageUrl={imageUrl} onUrlChange={setImageUrl} />
          </SectionCard>

          <SectionCard title="Page Preview">
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-xs font-medium text-slate-500">Title tag</div>
                <div className="mt-1 rounded bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  {name || "Product name"} — {selectedCategory?.name ?? "Category"} | BRYT Dental
                  Technologies
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Meta description</div>
                <div className="mt-1 rounded bg-slate-50 px-3 py-2 text-xs text-slate-700 line-clamp-3">
                  {intro || description || "No description set"}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">URL</div>
                <div className="mt-1 rounded bg-slate-50 px-3 py-2 font-mono text-xs text-primary">
                  /products/{categorySlug}/{slug || "…"}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </form>
  );
}
