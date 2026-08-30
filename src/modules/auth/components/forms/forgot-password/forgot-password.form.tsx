import { AuthNavigation } from "@/modules/auth/components/auth-navigation/auth-navigation";
import styles from "./styles.module.css";
import { BackToLogin } from "@/modules/auth/components/back-to-login/back-to-login";
import { useForgotPassword } from "@/modules/auth/hooks/use-forgot-password";
import { MailCheckIcon } from "lucide-react";
import { useState } from "react";
import { EMAIL_MAX_LENGTH } from "@/modules/auth/const/auth-schemas.const";

export const ForgotPasswordForm = () => {
  const [isFirstRequest, setIsFirstRequest] = useState(false);
  const { form, isPending } = useForgotPassword({
    onSuccess: () => setIsFirstRequest(true),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <fieldset disabled={isPending} className={styles.fieldSet}>
        {isFirstRequest && (
          <span className={styles.icon}>
            <MailCheckIcon />
          </span>
        )}
        <div className={styles.titleContainer}>
          <h2> {isFirstRequest ? "Check your email" : "Forgot password?"}</h2>
          <p>
            {isFirstRequest
              ? `We sent a password reset link to ${form.getFieldValue("email")}`
              : "No worries, we'll sent you reset instructions."}
          </p>
        </div>

        {!isFirstRequest && (
          <>
            <div className={styles.inputContainer}>
              <form.AppField
                name="email"
                children={(field) => (
                  <field.FormInput
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    required
                    maxLength={EMAIL_MAX_LENGTH}
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
        {isFirstRequest && (
          <AuthNavigation
            type={{
              type: "forgotPassword",
              onClick: form.handleSubmit,
            }}
          />
        )}
        <BackToLogin className={styles.login} />
      </fieldset>
    </form>
  );
};
