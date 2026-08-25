import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";
import { Check, X } from "lucide-react";

type Column<T extends object> = {
  header: string;
  key: Extract<keyof T, string>;
  render?: (row: T) => ReactNode;
};

type Props<T extends object> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  renderActions?: (row: T) => ReactNode;
};

const renderValue = (value: unknown): ReactNode => {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? <Check color="green" /> : <X color="red" />;
  }

  return String(value);
};

export const Table = <T extends object>({ data, columns, className, renderActions }: Props<T>) => {
  return (
    <div className={classNames(styles.container, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ header }) => (
              <th key={header} className={styles.th}>
                {header}
              </th>
            ))}
            {renderActions !== undefined && <th className={styles.th}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={"id" in row ? String(row.id) : i} className={styles.tr}>
              {columns.map(({ key, render }) => (
                <td key={key} className={styles.td}>
                  {render ? render(row) : renderValue(row[key])}
                </td>
              ))}
              {renderActions !== undefined && <td className={styles.td}>{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
