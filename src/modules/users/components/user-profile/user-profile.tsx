import classNames from "classnames";
import styles from "./styles.module.css";
import type { User } from "@/core/types/api/shared/user.type";
import { Avatar } from "@/core/components/avatar/avatar";
import { Popover } from "@/core/components/popover/popover";
import { Ellipsis, LogOut, MonitorCog, Settings } from "lucide-react";
import { AppButton } from "@/core/components/app-button/app-button";
import { UpdateProfileDialog } from "@/modules/users/components/update-profile-dialog/update-profile-dialog";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";

type Props = {
  className?: string;
  user: User;
};

export const UserProfile = ({ className, user }: Props) => {
  const { mutate, isPending } = useLogout();
  return (
    <Popover
      sideOffset={-5}
      trigger={(open) => (
        <div
          role="button"
          className={classNames(className, styles.container, {
            [styles.opened]: open,
          })}
        >
          <Avatar imageUrl={user.avatarUrl ?? undefined} fallback="LG" className={styles.avatar} />
          {user.firstName !== null && user.lastName !== null && (
            <span className={styles.name}>
              {user.firstName}
              &nbsp;
              {user.lastName}
            </span>
          )}
          <AppButton variant="ghost">
            <Ellipsis />
          </AppButton>
        </div>
      )}
      renderContent={() => (
        <div className={styles.content}>
          <div className={styles.info}>
            <Avatar
              className={styles.infoAvatar}
              imageUrl={user.avatarUrl ?? undefined}
              fallback="LG"
            />
            <div className={styles.infoContainer}>
              {user.firstName !== null && user.lastName !== null && (
                <span>
                  {user.firstName}
                  &nbsp;
                  {user.lastName}
                </span>
              )}
              <span className={styles.email}>{user.email}</span>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.actions}>
            <UpdateProfileDialog
              user={user}
              trigger={
                <AppButton variant="ghost" className={styles.action} icon={<Settings size={20} />}>
                  Account Settings
                </AppButton>
              }
            />

            {user.role === "admin" && (
              <Link to={ROUTES.admin.users.href} disabled={isPending} className={styles.action}>
                <MonitorCog size={20} />
                Dashboard
              </Link>
            )}
            <AppButton
              disabled={isPending}
              onClick={() => mutate()}
              variant="ghost"
              className={styles.action}
              icon={<LogOut size={20} />}
            >
              Log out
            </AppButton>
          </div>
        </div>
      )}
    />
  );
};
