import { Link, useRouter } from "@tanstack/react-router";
import styles from "./styles.module.css";
import { AuthNavigation } from "@/modules/auth/components/auth-navigation/auth-navigation";
import { useSignIn } from "@/modules/auth/hooks/use-sign-in";
import { ROUTES } from "@/core/const/routes.const";
import { SocialLogin } from "@/modules/auth/components/social-login/social-login";

type Props = {
  redirectPath?: string;
};

export const SignInForm = ({ redirectPath }: Props) => {
  const router = useRouter();
  const { form, isPending } = useSignIn({
    onSuccess({ data }) {
      router.navigate({
        to: redirectPath ?? (data.role === "admin" ? "/admin" : ROUTES.auth.signUp.href),
      });
    },
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
        <div className={styles.titleContainer}>
          <h2>Login</h2>
          <p>Let's build together!</p>
        </div>

        <div className={styles.inputContainer}>
          <form.AppField
            name="email"
            children={(field) => (
              <field.FormInput type="email" placeholder="Enter email" label="Email" required />
            )}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.FormInput
                type="password"
                placeholder="Enter password"
                label="Password"
                required
              />
            )}
          />

          <Link to={ROUTES.auth.forgotPassword.href} className={styles.forgotPassword}>
            Forgot password?
          </Link>
        </div>
        <form.AppForm>
          <form.FormButton className={styles.button}>Login</form.FormButton>
        </form.AppForm>
        <SocialLogin redirectPath={redirectPath} />

        <AuthNavigation type="login" />
      </fieldset>
    </form>
  );
};
