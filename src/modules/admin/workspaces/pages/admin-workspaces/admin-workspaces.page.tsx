import { useGetUser } from "@/modules/shared/hooks/use-get-user";
import styles from "./styles.module.css";
import classNames from "classnames";
import { UsersList } from "@/modules/admin/users/components/users-list/users-list";
import { CursorPagination } from "@/core/components/cursor-pagination/cursor-pagination";
import { AdminFilters } from "@/modules/admin/components/admin-filters/admin-filters";
import { GET_USERS_MAX_LIMIT } from "@/modules/admin/users/const/admin-user-schemas.const";
import { createLimitOptions } from "@/modules/admin/helpers/create-limit-options";
import { Spinner } from "@/core/components/spinner/spinner";
import { Breadcrumb } from "@/core/components/breadcrumb/breadcrumb";
import { useWorkspaceFilters } from "@/modules/admin/workspaces/context/workspace-filters.context";
import { useGetWorkspaces } from "@/modules/admin/workspaces/hooks/use-get-workspaces";
import { GET_WORKSPACES_MAX_LIMIT } from "@/modules/admin/workspaces/const/admin-workspace-schemas.const";
import { AdminHeading } from "@/modules/admin/components/admin-heading/admin-heading";
import { WorkspacesList } from "@/modules/admin/workspaces/const/workspaces-list/workspaces-list";
import { AppButton } from "@/core/components/app-button/app-button";
import { Dialog } from "@/core/components/dialog/dialog";
import { CreateUpdateWorkspaceForm } from "@/modules/admin/workspaces/components/forms/create-update-workspace/create-update-workspace-form";

type Props = {
  className?: string;
};

export const AdminWorkspacesPage = ({ className }: Props) => {
  const user = useGetUser();
  const { filters, lazyFilters, setFilter, applyFilters, resetFilters } = useWorkspaceFilters();
  const { data, isPending, isFetching } = useGetWorkspaces(filters, { enabled: user !== null });

  if (!user) return null;

  return (
    <div className={classNames(styles.container, className)}>
      <AdminHeading
        title="Workspaces"
        description="Manage workspaces and their access"
        breadcrumbs={[
          {
            label: "Admin",
          },
          {
            label: "Workspaces",
          },
        ]}
      >
        <div className={styles.top}>
          <Dialog
            trigger={<AppButton>Create Workspace</AppButton>}
            renderContent={() => <CreateUpdateWorkspaceForm />}
          />
          <AdminFilters
            filters={filters}
            lazyFilters={lazyFilters}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            types={[
              {
                key: "search",
                label: "Search",
                placeholder: "Search workspaces by name",
                type: "input",
                value: lazyFilters?.search,
                parse: (val) => val,
                format: (val) => (val === undefined ? "" : String(val)),
                onValueChange: setFilter,
              },
              {
                key: "limit",
                label: "Limit",
                placeholder: "Select...",
                type: "select",
                value: lazyFilters?.limit,
                items: createLimitOptions(GET_USERS_MAX_LIMIT, 25),
                parse: (val) => Number(val),
                format: (val) => (val === undefined ? "" : String(val)),
                onValueChange: setFilter,
              },
            ]}
            disabled={isPending || isFetching}
          />
        </div>
      </AdminHeading>

      <div className={styles.content}>
        {isPending && (
          <div className={styles.loader}>
            <Spinner size="large" />
          </div>
        )}
        <WorkspacesList
          className={classNames({ [styles.opacity]: isFetching || isPending })}
          workspaces={data?.data ?? []}
        />
      </div>
      {data && (
        <CursorPagination
          prevCursor={data.prevCursor}
          nextCursor={data.nextCursor}
          disabled={isPending || isFetching}
          onPrevClick={(prev) => setFilter("prevCursor", prev)}
          onNextClick={(next) => setFilter("nextCursor", next)}
        />
      )}
    </div>
  );
};
