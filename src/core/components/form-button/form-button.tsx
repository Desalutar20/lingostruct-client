import type { ComponentProps } from "react";
import { useFormContext } from "@/core/lib/tanstack-form";
import { AppButton } from "@/core/components/app-button/app-button";
import { Spinner } from "@/core/components/spinner/spinner";
import styles from "./styles.module.css";

type Props = {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  withSpinner?: boolean;
} & ComponentProps<"button">;

export const FormButton = ({ withSpinner, ...props }: Props) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting, state.isPristine]}
      children={([canSubmit, isSubmitting, isPristine]) => (
        <AppButton {...props} disabled={!canSubmit || isPristine || isSubmitting || props.disabled}>
          {isSubmitting ? (
            <span className={styles.loading}>
              <span>Loading...</span>
              {withSpinner && <Spinner size="small" />}
            </span>
          ) : (
            (props.children ?? "Submit")
          )}
        </AppButton>
      )}
    />
  );
};
