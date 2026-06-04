import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/sterilisation")({
  loader: () => { throw redirect({ to: "/products/$category", params: { category: "clinical-products" }, replace: true }); },
  component: () => null,
});
