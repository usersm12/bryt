import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/implants")({
  loader: () => { throw redirect({ to: "/products/$category", params: { category: "clinical-products" }, replace: true }); },
  component: () => null,
});
