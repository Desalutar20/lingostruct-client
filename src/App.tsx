import { Link, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/core/lib/tanstack-query";
import { router } from "@/core/lib/tanstack-router";
import { Toaster } from "sonner";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Link />
      <Toaster position="top-right" richColors expand />
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
      <TanStackDevtools
        config={{ hideUntilHover: true, position: "top-right", panelLocation: "top" }}
        plugins={[formDevtoolsPlugin()]}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
