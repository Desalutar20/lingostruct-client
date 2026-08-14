import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/core/lib/tanstack-query";
import { router } from "@/core/lib/tanstack-router";
import { Toaster } from "sonner";
import { useGetMe } from "@/modules/users/hooks/use-get-me";
import { AppLoading } from "@/core/components/app-loading/app-loading";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Tanstack = () => {
  const { data, isPending } = useGetMe();

  if (isPending) return <AppLoading />;

  return (
    <>
      <RouterProvider context={{ user: data ?? null }} router={router} />
      <TanStackRouterDevtools router={router} />
      <TanStackDevtools
        config={{ hideUntilHover: true, position: "top-right", panelLocation: "top" }}
        plugins={[formDevtoolsPlugin()]}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors expand />
      <Tanstack />
    </QueryClientProvider>
  );
};
