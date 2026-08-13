import type { ComponentProps } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  size?: "small" | "medium" | "large";
} & ComponentProps<"span">;

export const Spinner = ({ size = "medium", className, ...props }: Props) => {
  return (
    <span
      className={classNames(styles.spinner, styles[size], className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
};
