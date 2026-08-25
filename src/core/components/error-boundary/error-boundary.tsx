import classNames from "classnames";
import { useNavigate } from "@tanstack/react-router";
import { RefreshCcw, AlertTriangle, SearchX } from "lucide-react";

import styles from "./styles.module.css";

type ZodValidationError = {
  issues: Array<{
    path: PropertyKey[];
    message: string;
    code: string;
  }>;
};

type Props = {
  className?: string;
  error?: unknown;
};

const isZodValidationError = (error: unknown): error is ZodValidationError => {
  if (!error || typeof error !== "object") {
    return false;
  }

  return "issues" in error && Array.isArray(error.issues);
};

const getZodError = (error: unknown): ZodValidationError | null => {
  if (isZodValidationError(error)) {
    return error;
  }

  if (error instanceof Error && isZodValidationError(error.cause)) {
    return error.cause;
  }

  return null;
};

export const ErrorBoundary = ({ className, error }: Props) => {
  const navigate = useNavigate();

  const zodError = getZodError(error);
  const isSearchValidationError = zodError !== null;

  const handleRetry = () => {
    if (isSearchValidationError) {
      navigate({
        to: ".",
        search: {},
        replace: true,
      });

      return;
    }

    window.location.reload();
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.card}>
        <div
          className={classNames(
            styles.iconWrapper,
            isSearchValidationError ? styles.warning : styles.error,
          )}
        >
          {isSearchValidationError ? (
            <SearchX className={styles.icon} />
          ) : (
            <AlertTriangle className={styles.icon} />
          )}
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            {isSearchValidationError ? "Invalid request" : "Unexpected error"}
          </span>

          <h1 className={styles.title}>
            {isSearchValidationError ? "Invalid page parameters" : "Something went wrong"}
          </h1>

          <p className={styles.description}>
            {isSearchValidationError
              ? "Some of the parameters in the page URL are invalid. Reset them and continue with the default settings."
              : "Something unexpected happened while loading this page. Try again and it should be back to normal."}
          </p>

          <button type="button" className={styles.button} onClick={handleRetry}>
            <RefreshCcw size={18} />

            <span>{isSearchValidationError ? "Reset and try again" : "Try again"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
