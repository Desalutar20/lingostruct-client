import classNames from "classnames";
import styles from "./styles.module.css";
import type { AdminUser as TAdminUser } from "@/core/types/api/admin/admin-user.type";
import { AdminUser } from "@/modules/admin/users/components/admin-user/admin-user";

type Props = {
  className?: string;
  users: TAdminUser[];
};

export const UsersList = ({ className, users }: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      {users.map((user) => (
        <AdminUser key={user.id} user={user} />
      ))}
    </div>
  );
};
