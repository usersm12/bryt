import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { dbGetStats } from "@/lib/db.server";
import { Package, Tag, ImageIcon, FileText, ArrowRight } from "lucide-react";

const getStats = createServerFn({ method: "GET" }).handler(async () => {
  return dbGetStats();
});

export const Route = createFileRoute("/admin/")({
  loader: async () => getStats(),
  component: Dashboard,
});

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "text-primary",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`inline-flex rounded-lg bg-primary/10 p-2 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-3xl font-bold text-navy">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-700">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-400">{sub}</div>}
    </div>
  );
}

function Dashboard() {
  const stats = Route.useLoaderData();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your product catalogue</p>
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Tag} label="Categories" value={stats.categories} />
        <StatCard icon={Package} label="Total Products" value={stats.products} />
        <StatCard
          icon={ImageIcon}
          label="With Images"
          value={stats.withImages}
          sub={`${stats.products - stats.withImages} missing images`}
        />
        <StatCard
          icon={FileText}
          label="With Rich Details"
          value={stats.withDetails}
          sub={`${stats.products - stats.withDetails} use generic description`}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-base font-bold text-navy">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            {[
              { to: "/admin/products" as const, label: "Manage Products" },
              { to: "/admin/categories" as const, label: "Manage Categories" },
              { to: "/admin/products/new" as const, label: "Add New Product" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 text-sm font-medium text-slate-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                {item.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-base font-bold text-navy">Setup Checklist</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { done: stats.categories > 0, label: "Categories seeded" },
              { done: stats.products > 0, label: "Products seeded" },
              { done: stats.withImages > 0, label: "At least one product image" },
              { done: stats.withDetails > 0, label: "At least one product with rich details" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span
                  className={`h-4 w-4 rounded-full ${item.done ? "bg-green-400" : "bg-slate-200"}`}
                />
                <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
