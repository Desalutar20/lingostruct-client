import classNames from "classnames";
import styles from "./styles.module.css";
import { Logo } from "@/core/components/logo/logo";
import type { ReactNode } from "react";
import type { User } from "@/core/types/api/shared/user.type";
import { UserProfile } from "@/modules/users/components/user-profile/user-profile";

type Props = {
  className?: string;
  content: ReactNode;
  user: User;
};

export const Sidebar = ({ className, content, user }: Props) => {
  return (
    <aside className={classNames(styles.container, className)}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentContainer}>{content}</div>
      </div>
      <UserProfile className={styles.userProfile} user={user} />
    </aside>
  );
};
