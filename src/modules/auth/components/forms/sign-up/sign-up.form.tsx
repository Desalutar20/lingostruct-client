import styles from "./styles.module.css";
import { useSignUp } from "@/modules/auth/hooks/use-sign-up";
import { AuthNavigation } from "@/modules/auth/components/auth-navigation/auth-navigation";
import { SocialLogin } from "@/modules/auth/components/social-login/social-login";

export const SignUpForm = () => {
  const { form, isPending } = useSignUp();

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
          <h2>Register</h2>
          <p>What are we working on today?</p>
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

          <form.AppField
            name="firstName"
            children={(field) => (
              <field.FormInput type="text" placeholder="Enter name" label="Name" required />
            )}
          />

          <form.AppField
            name="lastName"
            children={(field) => (
              <field.FormInput
                type="text"
                placeholder="Enter last name"
                label="Last Name"
                required
              />
            )}
          />
        </div>
        <form.AppForm>
          <form.FormButton withSpinner={true} className={styles.button}>
            Register
          </form.FormButton>
        </form.AppForm>

        <SocialLogin />

        <AuthNavigation type="register" />
      </fieldset>
    </form>
  );
};
