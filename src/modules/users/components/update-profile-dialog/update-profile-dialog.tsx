import { type ReactElement } from "react";
import styles from "./styles.module.css";
import { Dialog } from "@/core/components/dialog/dialog";
import { Tabs } from "@/core/components/tabs/tabs";
import type { User } from "@/core/types/api/shared/user.type";
import { UpdateProfileForm } from "@/modules/users/components/forms/update-profile/update-profile.form";
import { AppButton } from "@/core/components/app-button/app-button";
import { useForgotPassword } from "@/modules/auth/hooks/use-forgot-password";
import { Spinner } from "@/core/components/spinner/spinner";

type Props = {
  trigger: ReactElement;
  user: User;
};

export const UpdateProfileDialog = ({ trigger, user }: Props) => {
  const { mutate, isPending, isSuccess } = useForgotPassword();

  return (
    <Dialog
      className={styles.dialog}
      trigger={trigger}
      renderContent={() => (
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <span>Account settings</span>
            <p>Update your profile picture and account details here</p>
          </div>
          <Tabs
            tabs={[
              {
                label: "Account info",
                content: <UpdateProfileForm user={user} />,
              },
              {
                label: "Password",
                content: (
                  <div className={styles.passwordContainer}>
                    <div className={styles.content}>
                      <span>Password Reset</span>
                      <p>To reset your password click on button.</p>
                    </div>
                    <div className={styles.action}>
                      <AppButton
                        className={styles.button}
                        disabled={isPending}
                        onClick={() => mutate({ email: user.email })}
                        variant="secondary"
                      >
                        {isPending ? "Loading..." : "Sent reset link"}
                        {isPending && <Spinner size="small" />}
                      </AppButton>

                      {isSuccess && <span>Password reset link sent to email.</span>}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
    />
  );
};
