import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { Breadcrumb, type BreadcrumbItem } from "@/core/components/breadcrumb/breadcrumb";
import classNames from "classnames";

type Props = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
};

export const AdminHeading = ({ breadcrumbs, title, description, className, children }: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.heading}>
        <Breadcrumb items={breadcrumbs} />

        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.title}>{title}</h1>

            <p className={styles.description}>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
