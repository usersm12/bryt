import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Package, LogOut, Tag, BarChart3 } from "lucide-react";

// Auth is checked in authMiddleware (start.ts) which runs inside the h3 event context.
// The result is passed as context.isAuthed — no createServerFn needed here.
export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location, context }) => {
    if (location.pathname === "/admin/login") return;
    console.log("[beforeLoad] context keys:", Object.keys(context));
    console.log("[beforeLoad] serverContext:", JSON.stringify(context.serverContext));
    console.log("[beforeLoad] isAuthed:", context.isAuthed);
    // Server: middleware sets isAuthed via additionalContext.serverContext
    // Client: serverContext doesn't exist, so read cookie directly instead
    let isAuthed: boolean | undefined = context.serverContext?.isAuthed ?? context.isAuthed;
    if (typeof isAuthed === "undefined" && typeof document !== "undefined") {
      isAuthed = document.cookie.split(";").some((c) => c.trim().startsWith("bryt_admin="));
    }
    console.log("[beforeLoad] final isAuthed:", isAuthed);
    if (!isAuthed) throw redirect({ to: "/admin/login" });
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
          <button
            onClick={() => {
              document.cookie = "bryt_admin=; path=/; max-age=0; samesite=lax";
              window.location.href = "/admin/login";
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
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
