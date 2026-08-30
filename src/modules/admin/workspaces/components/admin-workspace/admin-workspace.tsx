import type { AdminWorkspace as TAdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";
import styles from "./styles.module.css";
import classNames from "classnames";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  className?: string;
  workspace: TAdminWorkspace;
};

export const AdminWorkspace = ({ className, workspace }: Props) => {
  const address = [
    workspace.street,
    workspace.streetNumber,
    workspace.city,
    workspace.postalCode,
    workspace.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className={classNames(styles.card, className)}>
      <Link
        to="/admin/workspaces/$id"
        params={{ id: workspace.id }}
        state={{ workspace }}
        className={styles.link}
      />
      <div className={styles.top}>
        <div className={styles.identity}>
          <h3 className={styles.name}>{workspace.name}</h3>

          <div className={styles.location}>
            <MapPin size={15} />
            <span>{address}</span>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span>City</span>
          <strong>{workspace.city}</strong>
        </div>

        <div className={styles.infoItem}>
          <span>Country</span>
          <strong>{workspace.country}</strong>
        </div>

        <div className={styles.infoItem}>
          <span>Postal code</span>
          <strong>{workspace.postalCode}</strong>
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <CalendarDays size={15} />

          <span>
            Created&nbsp;
            <strong>{new Date(workspace.createdAt).toLocaleDateString()}</strong>
          </span>
        </div>

        <div className={styles.metaItem}>
          <CalendarDays size={15} />

          <span>
            Updated&nbsp;
            <strong>{new Date(workspace.updatedAt).toLocaleDateString()}</strong>
          </span>
        </div>
      </div>
    </article>
  );
};
