import type { AdminUser as TAdminUser } from "@/core/types/api/admin/admin-user.type";
import styles from "./styles.module.css";
import { Avatar } from "@/core/components/avatar/avatar";
import classNames from "classnames";
import { CheckIcon, XIcon } from "lucide-react";
import { UserActions } from "@/modules/admin/users/components/user-actions/user-actions";

type Props = {
  className?: string;
  user: TAdminUser;
};

const ProviderIcon = ({
  provider,
  className,
}: {
  provider: "google" | "github";
  className?: string;
}) => (
  <svg className={className} aria-hidden="true">
    <use href={`/sprites.svg#${provider}`} />
  </svg>
);

export const AdminUser = ({ className, user }: Props) => {
  return (
    <article key={user.id} className={classNames(styles.card, className)}>
      <div className={styles.top}>
        <div className={styles.user}>
          <Avatar
            className={styles.avatar}
            fallback={user.firstName?.[0] ?? user.email[0]}
            imageUrl={user.avatarUrl ?? undefined}
          />

          <div className={styles.identity}>
            <div className={styles.name}>
              {[user.firstName, user.lastName].filter(Boolean).join(" ") || "Unknown user"}
            </div>

            <div className={styles.email}>{user.email}</div>
          </div>
        </div>

        <span className={styles.role}>{user.role}</span>
        <UserActions userId={user.id} isBanned={user.isBanned} />
      </div>

      <div className={styles.status}>
        <div className={styles.statusItem}>
          <span>Verified</span>

          <div
            className={classNames(
              styles.statusValue,
              user.isVerified ? styles.statusSuccess : styles.statusError,
            )}
          >
            {user.isVerified ? <CheckIcon size={16} /> : <XIcon size={16} />}

            <strong>{user.isVerified ? "Verified" : "Not verified"}</strong>
          </div>
        </div>

        <div className={styles.statusItem}>
          <span>Banned</span>

          <div
            className={classNames(
              styles.statusValue,
              user.isBanned ? styles.statusError : styles.statusSuccess,
            )}
          >
            {user.isBanned ? <XIcon size={16} /> : <CheckIcon size={16} />}

            <strong>{user.isBanned ? "Banned" : "Active"}</strong>
          </div>
        </div>

        <div className={styles.statusItem}>
          <span>Created</span>

          <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
        </div>
      </div>

      <div className={styles.providers}>
        <span className={styles.providersLabel}>Connected accounts</span>

        <div className={styles.providerList}>
          <div className={classNames(styles.provider, !user.googleId && styles.providerDisabled)}>
            <ProviderIcon provider="google" className={styles.providerIcon} />

            <span>{user.googleId ? "Google connected" : "Google not connected"}</span>
          </div>

          <div className={classNames(styles.provider, !user.githubId && styles.providerDisabled)}>
            <ProviderIcon provider="github" className={styles.providerIcon} />

            <span>{user.githubId ? "GitHub connected" : "GitHub not connected"}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
