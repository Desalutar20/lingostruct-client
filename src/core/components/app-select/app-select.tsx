import { Select } from "@base-ui/react/select";
import { ChevronDown, Check } from "lucide-react";

import styles from "./styles.module.css";

export type SelectItem = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  label?: string;
  placeholder?: string;
  items: SelectItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
};

export const AppSelect = ({
  className,
  label,
  placeholder = "Select...",
  items,
  value,
  defaultValue,
  onValueChange,
  disabled,
}: Props) => {
  return (
    <Select.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {label && <Select.Label className={styles.label}>{label}</Select.Label>}

      <Select.Trigger className={`${styles.trigger} ${className ?? ""}`}>
        <Select.Value placeholder={placeholder} className={styles.value} />

        <Select.Icon className={styles.icon}>
          <ChevronDown size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className={styles.positioner} sideOffset={6}>
          <Select.Popup className={styles.popup}>
            <Select.List className={styles.list}>
              {items.map((item) => (
                <Select.Item key={item.value} value={item.value} className={styles.item}>
                  <Select.ItemText className={styles.itemText}>{item.label}</Select.ItemText>

                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};
