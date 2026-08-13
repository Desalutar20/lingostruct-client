import type { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  icon?: ReactNode;
} & ComponentProps<"button">;

export const AppButton = ({ className, variant = "primary", icon, children, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={classNames(styles.button, className, styles[variant], {
        [styles.withIcon]: icon !== undefined,
      })}
    >
      {children}
      {icon}
    </button>
  );
};
