type ZodError = {
  message: string;
  path: string[];
  code: string;
};

export const isZodError = (error: unknown): error is ZodError => {
  if (typeof error !== "object" || !error) return false;

  const err = error as ZodError;

  return (
    err.message !== undefined &&
    err.code !== undefined &&
    err.path !== undefined &&
    Array.isArray(err.path)
  );
};
