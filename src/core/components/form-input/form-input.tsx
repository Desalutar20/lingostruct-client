import type { ComponentProps } from "react";
import classNames from "classnames";
import { AppInput } from "@/core/components/app-input/app-input";
import { useFieldContext } from "@/core/lib/tanstack-form";
import styles from "./styles.module.css";
import { isZodError } from "@/core/types/type-guards";

type Props = {
  label?: string;
} & ComponentProps<"input">;

export const FormInput = ({ label, className, ...rest }: Props) => {
  const field = useFieldContext<string>();

  const input = (
    <AppInput
      {...rest}
      state={
        !field.state.meta.isTouched
          ? "default"
          : field.state.meta.errors.length > 0
            ? "error"
            : "success"
      }
      className={classNames(styles.input, className)}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );

  const errors = field.state.meta.errors.map((err, i) => (
    <span key={i} className={styles.error}>
      {isZodError(err) ? err.message : typeof err === "string" ? err : ""}
    </span>
  ));

  if (label)
    return (
      <label className={styles.label}>
        <span>
          {label}
          {rest.required ? "*" : ""}
        </span>
        {input}
        {errors}
      </label>
    );

  return (
    <div className={styles.container}>
      {input}
      {errors}
    </div>
  );
};
