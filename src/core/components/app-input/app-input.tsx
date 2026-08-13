import type { ComponentProps } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  state?: "default" | "success" | "error";
} & ComponentProps<"input">;

export const AppInput = ({ className, state, ...rest }: Props) => (
  <input data-state={state} className={classNames(styles.input, className)} {...rest} />
);
