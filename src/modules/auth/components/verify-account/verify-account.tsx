import { useVerifyAccount } from "@/modules/auth/hooks/use-verify-account";
import type { VerifyAccountInput } from "@/modules/auth/schemas/verify-account.schema";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { Spinner } from "@/core/components/spinner/spinner";
import { useCountDown } from "@/core/hooks/use-countdown";
import { useRouter } from "@tanstack/react-router";
import classNames from "classnames";
import { AppButton } from "@/core/components/app-button/app-button";
import { BackToLogin } from "@/modules/auth/components/back-to-login/back-to-login";
import { ROUTES } from "@/core/const/routes.const";

type Props = {
  data: VerifyAccountInput;
  className?: string;
};

export const VerifyAccount = ({ data, className }: Props) => {
  const { mutate, isPending, isSuccess, isError } = useVerifyAccount();
  const router = useRouter();
  const { seconds, start } = useCountDown(5, () =>
    router.navigate({ to: ROUTES.auth.signIn.href }),
  );

  useEffect(() => {
    mutate(data);
  }, [data, mutate]);

  useEffect(() => {
    if (!isSuccess) return;

    start();
  }, [isSuccess, start]);

  return (
    <section className={classNames(styles.container, className)}>
      {isPending && (
        <>
          <div className={`${styles.icon} ${styles.loadingIcon}`}>
            <Spinner size="large" />
          </div>

          <div className={styles.content}>
            <h2>Verifying your account</h2>

            <p>
              We're verifying your account.
              <br />
              This will only take a moment.
            </p>
          </div>
        </>
      )}

      {isSuccess && (
        <>
          <div className={`${styles.icon} ${styles.successIcon}`}>
            <span>✓</span>
          </div>

          <div className={styles.content}>
            <h2>Account verified!</h2>

            <p>Your account has been successfully verified.</p>

            <p className={styles.redirectText}>
              Redirecting to sign in in <strong>{seconds}</strong> seconds
            </p>

            <AppButton
              variant="ghost"
              className={styles.button}
              onClick={() => router.navigate({ to: ROUTES.auth.signIn.href })}
            >
              Continue to sign in
            </AppButton>
          </div>
        </>
      )}

      {isError && (
        <>
          <div className={`${styles.icon} ${styles.errorIcon}`}>
            <span>!</span>
          </div>

          <div className={styles.content}>
            <h2>Verification failed</h2>

            <p>We couldn't verify your account. The verification link may be invalid or expired.</p>

            <BackToLogin />
          </div>
        </>
      )}
    </section>
  );
};
