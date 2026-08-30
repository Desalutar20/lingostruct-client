import { useFilters } from "@/modules/admin/hooks/use-filters";
import { getWorkspacesSchema } from "@/modules/admin/workspaces/schemas/get-workspaces.schema";

import { createContext, useContext, type ReactNode } from "react";

type WorkspaceFiltersContextValue = ReturnType<typeof useFilters<typeof getWorkspacesSchema>>;

const WorkspaceFiltersContext = createContext<WorkspaceFiltersContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const WorkspaceFiltersProvider = ({ children }: Props) => {
  const value = useFilters(getWorkspacesSchema);

  return (
    <WorkspaceFiltersContext.Provider value={value}>{children}</WorkspaceFiltersContext.Provider>
  );
};

export const useWorkspaceFilters = () => {
  const context = useContext(WorkspaceFiltersContext);

  if (context === null) {
    throw new Error("useWorkspaceFilters must be used within WorkspaceFiltersProvider");
  }

  return context;
};
