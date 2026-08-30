import classNames from "classnames";
import styles from "./styles.module.css";
import type { AdminWorkspace as TAdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";
import { AdminWorkspace } from "@/modules/admin/workspaces/components/admin-workspace/admin-workspace";

type Props = {
  className?: string;
  workspaces: TAdminWorkspace[];
};

export const WorkspacesList = ({ className, workspaces }: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      {workspaces.map((workspace) => (
        <AdminWorkspace key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
};
