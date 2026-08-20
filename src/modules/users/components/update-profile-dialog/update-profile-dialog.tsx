import { type ReactElement } from "react";
import styles from "./styles.module.css";
import { Dialog } from "@/core/components/dialog/dialog";
import { Tabs } from "@/core/components/tabs/tabs";
import type { User } from "@/core/types/api/shared/user.type";
import { UpdateProfileForm } from "@/modules/users/components/forms/update-profile/update-profile.form";

type Props = {
  trigger: ReactElement;
  user: User;
};

export const UpdateProfileDialog = ({ trigger, user }: Props) => {
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
                content: "Password",
              },
            ]}
          />
        </div>
      )}
    />
  );
};
