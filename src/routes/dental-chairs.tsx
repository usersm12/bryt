import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dental-chairs")({
  loader: () => { throw redirect({ to: "/products/$category", params: { category: "dental-chair-units" }, replace: true }); },
  component: () => null,
});
