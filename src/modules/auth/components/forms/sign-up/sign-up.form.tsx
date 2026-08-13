import styles from "./styles.module.css";
import { useSignUp } from "@/modules/auth/hooks/use-sign-up";

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
          <h2>Sign up</h2>
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
          <form.FormButton className={styles.button}>Sign Up</form.FormButton>
        </form.AppForm>
      </fieldset>
    </form>
  );
};
