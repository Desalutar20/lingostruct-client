import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { z, ZodType } from "zod";

export const useFilters = <T extends ZodType>(schema: T) => {
  type Filters = Partial<z.output<T>>;

  const [filters, setFilters] = useState<Filters>({});
  const [lazyFilters, setLazyFilters] = useState<Filters>({});

  const search = useSearch({ from: "__root__" });
  const navigate = useNavigate();

  const validate = useCallback(
    (input: Filters, cb?: () => void) => {
      const { success, data } = schema.safeParse(input);
      if (!success) {
        toast.error("Invalid page parameters");
        cb?.();
        return;
      }

      return data;
    },
    [schema],
  );

  useEffect(() => {
    if (Object.keys(search).length === 0) return;

    const data = validate(search, () => navigate({ to: ".", search: {} }));
    if (!data) return;

    setFilters(data);
    setLazyFilters(data);
  }, [schema]);

  const applyFilters = () => {
    const data = validate(lazyFilters);
    if (!data) return;

    navigate({ to: ".", search: data });
    setFilters(data);
  };

  const resetFilters = () => {
    setLazyFilters({});
    setFilters({});
    navigate({ to: ".", search: {} });
  };

  const setFilter = <K extends keyof z.output<T>>(key: K, value: z.output<T>[K]) => {
    setLazyFilters((prev) => {
      let next = {
        ...prev,
        [key]: value,
      } as Filters;

      if (key !== "prevCursor" && key !== "nextCursor") {
        next = {
          ...next,
          prevCursor: undefined,
          nextCursor: undefined,
        };
      }

      if (key === "prevCursor") {
        next = {
          ...next,
          nextCursor: undefined,
        };
      }

      if (key === "nextCursor") {
        next = {
          ...next,
          prevCursor: undefined,
        };
      }

      if (key === "prevCursor" || key === "nextCursor") {
        const data = validate(next);
        if (data) {
          navigate({ to: ".", search: data });
          setFilters(data);
          return data;
        }
      }

      return next;
    });
  };

  return {
    filters,
    lazyFilters,
    setFilter,
    setFilters(f: Filters) {
      setFilters(f);
      setLazyFilters(f);
      navigate({ to: ".", search: f });
    },
    applyFilters,
    resetFilters,
  };
};
