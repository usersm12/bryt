import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { dbListCategories, dbCreateCategory, dbUpdateCategory, dbDeleteCategory, type DbCategory } from "@/lib/db.server";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

const listCats = createServerFn({ method: "GET" }).handler(() => dbListCategories());

const createCat = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as Omit<DbCategory, "sort_order">)
  .handler(({ data }) => dbCreateCategory(data));

const updateCat = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { slug: string; data: Partial<Omit<DbCategory, "slug">> })
  .handler(({ data }) => dbUpdateCategory(data.slug, data.data));

const deleteCat = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { slug: string })
  .handler(({ data }) => dbDeleteCategory(data.slug));

export const Route = createFileRoute("/admin/categories")({
  loader: () => listCats(),
  component: CategoriesPage,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function InlineEdit({
  cat,
  onDone,
}: {
  cat: DbCategory;
  onDone: () => void;
}) {
  const [name, setName] = useState(cat.name);
  const [tagline, setTagline] = useState(cat.tagline);
  const [description, setDescription] = useState(cat.description);
  const router = useRouter();

  async function save() {
    await updateCat({ data: { slug: cat.slug, data: { name, tagline, description } } });
    router.invalidate();
    onDone();
  }

  return (
    <div className="space-y-2 p-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded border border-slate-200 px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
        placeholder="Category name"
      />
      <input
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        className="w-full rounded border border-slate-200 px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
        placeholder="Tagline"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full rounded border border-slate-200 px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
        placeholder="Description"
      />
      <div className="flex gap-2">
        <button
          onClick={save}
          className="flex items-center gap-1 rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white"
        >
          <Check className="h-3 w-3" /> Save
        </button>
        <button
          onClick={onDone}
          className="flex items-center gap-1 rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
        >
          <X className="h-3 w-3" /> Cancel
        </button>
      </div>
    </div>
  );
}

function AddCategory({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const slug = slugify(name);
    await createCat({ data: { slug, name, tagline, description } });
    router.invalidate();
    onDone();
  }

  return (
    <form onSubmit={save} className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
      <h3 className="text-sm font-semibold text-navy">New Category</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
        placeholder="Category name (e.g. Sterilisation)"
      />
      <input
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
        placeholder="Tagline (short phrase)"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
        placeholder="Description"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-primary px-4 py-1.5 text-xs font-semibold text-white"
        >
          Create
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded border border-slate-200 px-4 py-1.5 text-xs text-slate-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function CategoriesPage() {
  const categories = Route.useLoaderData();
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete category "${name}"? This will also delete all its products.`)) return;
    await deleteCat({ data: { slug } });
    router.invalidate();
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="space-y-3">
        {adding && <AddCategory onDone={() => setAdding(false)} />}

        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            {editing === cat.slug ? (
              <InlineEdit cat={cat} onDone={() => setEditing(null)} />
            ) : (
              <div className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy">{cat.name}</span>
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                      {cat.slug}
                    </code>
                  </div>
                  {cat.tagline && (
                    <p className="mt-0.5 text-sm text-slate-500">{cat.tagline}</p>
                  )}
                  {cat.description && (
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">{cat.description}</p>
                  )}
                </div>
                <div className="ml-4 flex gap-1.5">
                  <button
                    onClick={() => setEditing(cat.slug)}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.slug, cat.name)}
                    className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
