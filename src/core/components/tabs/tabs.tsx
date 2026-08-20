import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { Tabs as Tb } from "@base-ui/react/tabs";
import { AppButton } from "@/core/components/app-button/app-button";
type Props = {
  className?: string;
  tabs: { label: string; content: ReactNode }[];
};

export const Tabs = ({ className, tabs }: Props) => {
  return (
    <Tb.Root className={styles.Root} defaultValue="overview">
      <Tb.List className={styles.list}>
        {tabs.map((t) => (
          <Tb.Tab
            key={t.label}
            className={styles.tab}
            value={t.label}
            render={<AppButton variant="ghost">{t.label}</AppButton>}
          />
        ))}
        <Tb.Indicator className={styles.Indicator} />
      </Tb.List>
      <div>
        {tabs.map((t) => (
          <Tb.Panel key={t.label} className={styles.panel} value={t.label}>
            {t.content}
          </Tb.Panel>
        ))}
      </div>
    </Tb.Root>
  );
};
