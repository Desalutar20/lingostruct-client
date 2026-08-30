import { useGetUser } from "@/modules/shared/hooks/use-get-user";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useLocation, useParams } from "@tanstack/react-router";
import { CreateUpdateWorkspaceForm } from "@/modules/admin/workspaces/components/forms/create-update-workspace/create-update-workspace-form";
import { AdminHeading } from "@/modules/admin/components/admin-heading/admin-heading";
import { ROUTES } from "@/core/const/routes.const";

type Props = {
  className?: string;
};

export const AdminWorkspacePage = ({ className }: Props) => {
  const user = useGetUser();
  const { id } = useParams({
    from: "/protectedLayout/adminLayout/admin/workspaces/$id",
  });
  const location = useLocation();
  if (!user) return null;

  return (
    <div className={classNames(styles.container, className)}>
      <AdminHeading
        title={location.state.workspace?.name ?? "Workspace"}
        description="Manage workspace details and settings"
        breadcrumbs={[
          {
            label: "Admin",
          },
          {
            label: "Workspaces",
            to: ROUTES.admin.workspaces.root.href,
          },
          {
            label: location.state.workspace?.name ?? `Workspace ${id}`,
          },
        ]}
      />

      <CreateUpdateWorkspaceForm workspace={location.state.workspace} />
    </div>
  );
};
