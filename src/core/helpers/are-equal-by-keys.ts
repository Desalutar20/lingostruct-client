export const areEqualByKeys = <T extends Record<string, unknown>>(
  a: T,
  b: Partial<T>,
  keys: readonly (keyof T)[],
) => keys.every((key) => a[key] === b[key]);
