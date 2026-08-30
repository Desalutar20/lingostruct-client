import { Popover } from "@/core/components/popover/popover";
import styles from "./styles.module.css";
import { AppButton } from "@/core/components/app-button/app-button";
import { Ban, CircleCheck, EllipsisVertical, Trash2 } from "lucide-react";
import type { AdminUser } from "@/core/types/api/admin/admin-user.type";
import { useSetUserBanStatus } from "@/modules/admin/users/hooks/use-set-user-ban-status";
import { useDeleteUser } from "@/modules/admin/users/hooks/use-delete-user";
import classNames from "classnames";
import { AlertDialog } from "@/core/components/alert-dialog/alert-dialog";
import { Spinner } from "@/core/components/spinner/spinner";

type Props = {
  userId: AdminUser["id"];
  isBanned: AdminUser["isBanned"];
  className?: string;
};

export const UserActions = ({ userId, isBanned, className }: Props) => {
  const { mutateAsync: setBanStatus, isPending: isBanPending } = useSetUserBanStatus();

  const { mutateAsync: deleteUser, isPending: isDeletePending } = useDeleteUser();

  const isPending = isBanPending || isDeletePending;

  return (
    <Popover
      sideOffset={0}
      trigger={() => (
        <AppButton className={className} variant="ghost" disabled={isPending}>
          <EllipsisVertical />
        </AppButton>
      )}
      renderContent={() => (
        <div className={styles.content}>
          <AlertDialog
            trigger={
              <AppButton
                disabled={isPending}
                variant="ghost"
                icon={isBanned ? <CircleCheck size={18} /> : <Ban size={18} />}
                className={styles.action}
              >
                {isBanned ? "Unban user" : "Ban user"}
              </AppButton>
            }
            title={isBanned ? "Unban user?" : "Ban user?"}
            description={
              isBanned
                ? "Are you sure you want to restore this user's access to their account?"
                : "Are you sure you want to ban this user? They will no longer be able to access their account."
            }
            continueText={
              isBanPending ? (
                <>
                  <Spinner size="small" />
                  {isBanned ? "Unbanning..." : "Banning..."}
                </>
              ) : (
                <>
                  {isBanned ? <CircleCheck size={16} /> : <Ban size={16} />}
                  {isBanned ? "Unban user" : "Ban user"}
                </>
              )
            }
            disabled={isPending}
            onContinue={async () => {
              await setBanStatus({
                id: userId,
                isBanned: !isBanned,
              });
            }}
          />
          <AlertDialog
            trigger={
              <AppButton
                disabled={isPending}
                variant="ghost"
                icon={<Trash2 size={18} />}
                className={classNames(styles.action, styles.delete)}
              >
                Delete user
              </AppButton>
            }
            title="Delete user?"
            description="Are you sure you want to delete this user? This action cannot be undone."
            continueText={
              isDeletePending ? (
                <>
                  <Spinner size="small" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete user
                </>
              )
            }
            disabled={isPending}
            onContinue={async () => {
              await deleteUser({ id: userId });
            }}
          />
        </div>
      )}
    />
  );
};
