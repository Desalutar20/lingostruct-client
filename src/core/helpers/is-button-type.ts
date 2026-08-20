import type { ReactElement } from "react";

export const isButtonType = (element?: ReactElement) => {
  if (!element) return false;

  const type = element.type;

  return type === "button" || (typeof type === "function" && type.name === "AppButton");
};
