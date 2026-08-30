import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export type BreadcrumbItem = {
  label: ReactNode;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumb = ({ items, className }: Props) => {
  return (
    <nav className={classNames(styles.breadcrumb, className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          {item.to ? (
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.label}>{item.label}</span>
          )}

          {index < items.length - 1 && (
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};
