import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { isAdminAuthenticated } from "@/lib/auth.server";
import { LayoutGrid, Package, LogOut, Tag, BarChart3 } from "lucide-react";

const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  return isAdminAuthenticated();
});

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/login") return;
    const authed = await checkAuth();
    if (!authed) throw redirect({ to: "/admin/login" });
  },
  component: AdminLayout,
});

const navItems = [
  { to: "/admin" as const, label: "Dashboard", icon: BarChart3, exact: true },
  { to: "/admin/products" as const, label: "Products", icon: Package },
  { to: "/admin/categories" as const, label: "Categories", icon: Tag },
];

function AdminLayout() {
  const location = useRouterState({ select: (s) => s.location.pathname });
  const isLogin = location === "/admin/login";

  if (isLogin) return <Outlet />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <Link to="/admin">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Admin
            </div>
            <div className="mt-0.5 font-display text-lg font-bold text-navy">BRYT Dental</div>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {navItems.map((item) => {
            const active = item.exact
              ? location === item.to
              : location.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <Link
            to="/admin/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
          <Link
            to="/"
            className="mt-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            <LayoutGrid className="h-4 w-4" />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
