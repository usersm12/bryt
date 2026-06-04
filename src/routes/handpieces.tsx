import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/handpieces")({
  loader: () => { throw redirect({ to: "/products/$category", params: { category: "handpieces" }, replace: true }); },
  component: () => null,
});
