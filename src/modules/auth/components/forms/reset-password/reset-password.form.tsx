import styles from "./styles.module.css";
import { BackToLogin } from "@/modules/auth/components/back-to-login/back-to-login";
import { CheckIcon } from "lucide-react";
import { useEffect } from "react";
import { useResetPassword } from "@/modules/auth/hooks/use-reset-password";
import type { ResetPasswordInput } from "@/modules/auth/schemas/reset-password.schema";

type Props = {
  data: Pick<ResetPasswordInput, "email" | "token">;
};

export const ResetPasswordForm = ({ data }: Props) => {
  const { form, isPending, isSuccess } = useResetPassword({});

  useEffect(() => {
    form.setFieldValue("email", data.email);
    form.setFieldValue("token", data.token);
  }, [form, data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <fieldset disabled={isPending} className={styles.fieldSet}>
        {isSuccess && (
          <span className={styles.icon}>
            <CheckIcon />
          </span>
        )}
        <div className={styles.titleContainer}>
          <h2> {isSuccess ? "Password reset" : "Set new password"}</h2>
          <p>
            {isSuccess
              ? `Your password has been successfully reset. Click below to log in magically.`
              : "Your new password must be different to previously used passwords."}
          </p>
        </div>

        {!isSuccess && (
          <>
            <div className={styles.inputContainer}>
              <form.AppField
                name="newPassword"
                children={(field) => (
                  <field.FormInput
                    type="password"
                    placeholder="Type a password"
                    label="Type a password"
                    required
                  />
                )}
              />

              <form.AppField
                name="newPasswordConfirm"
                children={(field) => (
                  <field.FormInput
                    type="password"
                    placeholder="Repeat your password here"
                    label="Repeat password"
                    required
                  />
                )}
              />
            </div>
            <form.AppForm>
              <form.FormButton withSpinner={true} className={styles.button}>
                Reset password
              </form.FormButton>
            </form.AppForm>
          </>
        )}
        <BackToLogin className={styles.login} />
      </fieldset>
    </form>
  );
};
