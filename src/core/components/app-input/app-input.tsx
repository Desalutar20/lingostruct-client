import type { ComponentProps } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  state?: "default" | "success" | "error";
  variant?: "primary" | "secondary";
} & ComponentProps<"input">;

export const AppInput = ({ className, state, variant = "primary", ...rest }: Props) => (
  <input
    data-state={state}
    className={classNames(styles.input, styles[variant], className)}
    {...rest}
  />
);
