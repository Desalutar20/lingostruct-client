import type {
  DefaultError,
  MutationOptions as MO,
  QueryOptions as QO,
} from "@tanstack/react-query";

export type MutationOptions<
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TOnMutateResult = unknown,
> = Omit<MO<TData, TError, TVariables, TOnMutateResult>, "mutationFn">;

export type QueryOptions<TData> = Omit<QO<TData, unknown, TData>, "queryKey" | "queryFn">;
