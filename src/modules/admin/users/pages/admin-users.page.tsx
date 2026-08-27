import { useGetUser } from "@/modules/shared/hooks/use-get-user";
import styles from "./styles.module.css";
import classNames from "classnames";
import { UsersList } from "@/modules/admin/users/components/users-list/users-list";
import { CursorPagination } from "@/core/components/cursor-pagination/cursor-pagination";
import { useGetUsers } from "@/modules/admin/users/hooks/use-get-users";
import { AdminFilters } from "@/modules/admin/components/admin-filters/admin-filters";
import { GET_USERS_MAX_LIMIT } from "@/modules/admin/users/const/admin-users-schemas.const";
import { createLimitOptions } from "@/modules/admin/helpers/create-limit-options";
import { Spinner } from "@/core/components/spinner/spinner";
import { Breadcrumb } from "@/core/components/breadcrumb/breadcrumb";
import { useUserFilters } from "@/modules/admin/users/context/user-filters.context";

type Props = {
  className?: string;
};

export const AdminUsersPage = ({ className }: Props) => {
  const user = useGetUser();
  const { filters, lazyFilters, setFilter, applyFilters, resetFilters } = useUserFilters();
  const { data, isPending, isFetching } = useGetUsers(filters, { enabled: user !== null });

  if (!user) return null;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.top}>
        <div className={styles.heading}>
          <Breadcrumb
            items={[
              {
                label: "Admin",
              },
              {
                label: "Users",
              },
            ]}
          />

          <div className={styles.titleRow}>
            <div>
              <h1 className={styles.title}>Users</h1>

              <p className={styles.description}>Manage users and their access</p>
            </div>

            <AdminFilters
              filters={filters}
              lazyFilters={lazyFilters}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              types={[
                {
                  key: "search",
                  label: "Search",
                  placeholder: "Search users by email, first name or last name",
                  type: "input",
                  value: lazyFilters?.search,
                  parse: (val) => val,
                  format: (val) => (val === undefined ? "" : String(val)),
                  onValueChange: setFilter,
                },
                {
                  key: "isBanned",
                  label: "Is Banned",
                  placeholder: "Select...",
                  type: "select",
                  value: lazyFilters?.isBanned,
                  items: [
                    {
                      value: "true",
                      label: "Banned",
                    },
                    {
                      value: "false",
                      label: "Not banned",
                    },
                    {
                      value: "any",
                      label: "Any",
                    },
                  ],
                  parse: (val) => (val === "any" ? undefined : val === "true"),
                  format: (val) => (val === undefined ? "" : String(val)),
                  onValueChange: setFilter,
                },
                {
                  key: "isVerified",
                  label: "Is Verified",
                  placeholder: "Select...",
                  type: "select",
                  value: lazyFilters?.isVerified,
                  items: [
                    {
                      value: "true",
                      label: "Verified",
                    },
                    {
                      value: "false",
                      label: "Not verified",
                    },
                    {
                      value: "any",
                      label: "Any",
                    },
                  ],
                  parse: (val) => (val === "any" ? undefined : val === "true"),
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
        </div>
      </div>
      <div className={styles.content}>
        {isPending && (
          <div className={styles.loader}>
            <Spinner size="large" />
          </div>
        )}
        <UsersList
          className={classNames({ [styles.opacity]: isFetching || isPending })}
          users={data?.data ?? []}
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
