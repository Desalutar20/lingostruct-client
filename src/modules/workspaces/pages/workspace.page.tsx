import { UserProfile } from "@/modules/users/components/user-profile/user-profile";
import { useGetUser } from "@/modules/shared/hooks/use-get-user";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Logo } from "@/core/components/logo/logo";

type Props = {
  className?: string;
};

export const WorkspacePage = ({ className }: Props) => {
  const user = useGetUser();

  if (!user) return null;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.top}>
        <Logo className={styles.logo} />
        <UserProfile user={user} />
      </div>
    </div>
  );
};
