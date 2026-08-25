export const createLimitOptions = (max: number, step: number) =>
  Array.from({ length: Math.floor(max / step) }, (_, index) => {
    const value = (index + 1) * step;

    return {
      value: String(value),
      label: String(value),
    };
  });
