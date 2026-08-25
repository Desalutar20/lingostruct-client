import classNames from "classnames";
import styles from "./styles.module.css";
import { Avatar } from "@/core/components/avatar/avatar";
import { useUpdateProfile } from "@/modules/users/hooks/use-update-profile";
import { useRef, type ChangeEvent } from "react";
import type { User } from "@/core/types/api/shared/user.type";
import { AppButton } from "@/core/components/app-button/app-button";
import { CloudUploadIcon, Trash2 } from "lucide-react";
import { AppInput } from "@/core/components/app-input/app-input";
import { useSelector } from "@tanstack/react-form";
import { areEqualByKeys } from "@/core/helpers/are-equal-by-keys";

type Props = {
  className?: string;
  user: User;
};

export const UpdateProfileForm = ({ className, user }: Props) => {
  const {
    form,
    isPending,
    uploadAvatar: { chooseImage, removeImage, filePreview, resetFiles },
  } = useUpdateProfile(user);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await chooseImage(file);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.top}>
        <Avatar
          className={styles.avatar}
          imageUrl={filePreview ?? undefined}
          fallback={
            user.firstName && user.lastName ? `${user.firstName[0]}${user.lastName[0]}` : ""
          }
        />
        <div className={styles.actionsContainer}>
          <div className={styles.btns}>
            <AppButton
              onClick={() => inputRef.current?.click()}
              variant="secondary"
              icon={<CloudUploadIcon size={20} />}
            >
              Upload new photo
            </AppButton>
            <AppInput
              onChange={handleUploadFile}
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
            />
            <AppButton
              disabled={filePreview === null}
              variant="ghost"
              icon={<Trash2 size={20} />}
              onClick={removeImage}
            >
              Remove photo
            </AppButton>
          </div>
          <p>Recommended size is 500x500px and max. 2MB</p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={styles.mid}
      >
        <form.AppField
          name="firstName"
          children={(field) => (
            <field.FormInput type="text" placeholder="Enter name" label="Name" />
          )}
        />

        <form.AppField
          name="lastName"
          children={(field) => (
            <field.FormInput type="text" placeholder="Enter last name" label="Last Name" />
          )}
        />

        <form.AppField
          name="lastName"
          children={(field) => (
            <field.FormInput
              className={styles.email}
              disabled
              type="email"
              placeholder="Enter email"
              label="Email"
              value={user.email}
            />
          )}
        />
      </form>
      <Btns form={form} user={user} isPending={isPending} resetFiles={resetFiles} />
    </div>
  );
};

const Btns = ({
  form,
  user,
  isPending,
  resetFiles,
}: {
  form: ReturnType<typeof useUpdateProfile>["form"];
  user: User;
  isPending: boolean;
  resetFiles: () => void;
}) => {
  const firstName = useSelector(form.store, (state) => state.values.firstName);
  const lastName = useSelector(form.store, (state) => state.values.lastName);
  const avatarUrl = useSelector(form.store, (state) => state.values.avatarUrl);

  const textFieldsUnchanged = areEqualByKeys(user, { firstName, lastName, avatarUrl }, [
    "firstName",
    "lastName",
    "avatarUrl",
  ]);
  // const hasAvatarChanges = avatarUrl !== undefined;

  const disabled = isPending || textFieldsUnchanged;

  return (
    <div className={styles.bottom}>
      <form.AppForm>
        <form.FormButton
          onClick={() => {
            form.reset();
            resetFiles();
          }}
          className={styles.button}
          disabled={disabled}
          variant="secondary"
        >
          Discard
        </form.FormButton>
      </form.AppForm>

      <form.AppForm>
        <form.FormButton
          onClick={form.handleSubmit}
          withSpinner={true}
          className={styles.button}
          disabled={disabled}
        >
          Save
        </form.FormButton>
      </form.AppForm>
    </div>
  );
};
