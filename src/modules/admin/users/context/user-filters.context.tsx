import { useFilters } from "@/modules/admin/hooks/use-filters";
import { getUsersSchema } from "@/modules/admin/users/schemas/get-users.schema";

import { createContext, useContext, type ReactNode } from "react";

type UserFiltersContextValue = ReturnType<typeof useFilters<typeof getUsersSchema>>;

const UserFiltersContext = createContext<UserFiltersContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const UserFiltersProvider = ({ children }: Props) => {
  const value = useFilters(getUsersSchema);

  return <UserFiltersContext.Provider value={value}>{children}</UserFiltersContext.Provider>;
};

export const useUserFilters = () => {
  const context = useContext(UserFiltersContext);

  if (context === null) {
    throw new Error("useUserFilters must be used within UserFiltersProvider");
  }

  return context;
};
