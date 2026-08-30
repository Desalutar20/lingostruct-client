import { Drawer } from "@/core/components/drawer/drawer";
import styles from "./styles.module.css";
import { AppButton } from "@/core/components/app-button/app-button";
import { Filter } from "lucide-react";
import { AppInput } from "@/core/components/app-input/app-input";
import { AppSelect } from "@/core/components/app-select/app-select";
import classNames from "classnames";
import { areEqualByKeys } from "@/core/helpers/are-equal-by-keys";

type Type<T extends Record<string, unknown>, K extends keyof T> = {
  key: K;
  label: string;
  placeholder?: string;
  onValueChange: (key: K, value: T[K]) => void;
  parse: (value: string) => T[K];
  format: (value: T[K]) => string;
  value: T[K];
} & (
  | {
      type: "input";
    }
  | {
      type: "select";
      items: { value: string; label: string }[];
    }
);

type Props<T extends Record<string, unknown>> = {
  className?: string;
  filters: T;
  lazyFilters: T;
  applyFilters: () => void;
  resetFilters: () => void;
  types: Type<T, keyof T>[];
  disabled?: boolean;
};

export const AdminFilters = <T extends Record<string, unknown>>({
  filters,
  lazyFilters,
  applyFilters,
  resetFilters,
  types,
  disabled,
  className,
}: Props<T>) => {
  return (
    <Drawer
      className={styles.drawer}
      trigger={
        <AppButton variant="ghost">
          <Filter size={20} />
        </AppButton>
      }
      renderContent={(close) => (
        <div className={classNames(styles.container, className)}>
          {types.map(
            ({ key, label, placeholder, value, onValueChange, parse, format, ...rest }) => (
              <label key={key as string} className={styles.label}>
                <span>{label}</span>
                {rest.type === "input" && (
                  <AppInput
                    variant="secondary"
                    placeholder={placeholder}
                    onChange={(e) => onValueChange(key, parse(e.target.value))}
                    value={format(value)}
                  />
                )}

                {rest.type === "select" && (
                  <AppSelect
                    placeholder={placeholder}
                    onValueChange={(v) => onValueChange(key, parse(v!))}
                    value={format(value)}
                    items={rest.items}
                  />
                )}
              </label>
            ),
          )}

          <div className={styles.buttons}>
            <AppButton
              onClick={() => {
                resetFilters();
                close();
              }}
              disabled={disabled || Object.keys(filters).length <= 0}
              variant="secondary"
            >
              Reset
            </AppButton>
            <AppButton
              onClick={() => {
                applyFilters();
                close();
              }}
              disabled={disabled || areEqualByKeys(filters, lazyFilters, Object.keys(lazyFilters))}
            >
              Apply
            </AppButton>
          </div>
        </div>
      )}
    />
  );
};
