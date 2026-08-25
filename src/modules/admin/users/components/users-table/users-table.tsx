import type { AdminUser } from "@/core/types/api/admin/admin-user.type";
import { Table } from "@/core/components/table/table";

type Props = {
  className?: string;
  users: AdminUser[];
};

export const UsersTable = ({ className, users }: Props) => {
  return (
    <Table
      className={className}
      data={users}
      columns={[
        {
          header: "Id",
          key: "id",
        },
        {
          header: "Created At",
          key: "createdAt",
        },
        {
          header: "Updated At",
          key: "updatedAt",
        },
        {
          header: "Email",
          key: "email",
        },
        {
          header: "First Name",
          key: "firstName",
        },
        {
          header: "Last Name",
          key: "lastName",
        },
        {
          header: "Role",
          key: "role",
        },
        {
          header: "Is Banned",
          key: "isBanned",
        },
        {
          header: "Is Verified",
          key: "isVerified",
        },
        {
          header: "Google ID",
          key: "googleId",
        },
        {
          header: "Github ID",
          key: "githubId",
        },
        {
          header: "Avatar ID",
          key: "avatarId",
        },
      ]}
      renderActions={(row) => <>USer Action</>}
    />
  );
};
