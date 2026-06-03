import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
      // TanStack Start passes middleware context nested under serverContext.
      // The authMiddleware sets serverContext.isAuthed via next({ context: { isAuthed } }).
      isAuthed: undefined as boolean | undefined,
      serverContext: undefined as { isAuthed?: boolean } | undefined,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
