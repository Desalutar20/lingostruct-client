import { useVerifyAccount } from "@/modules/auth/hooks/use-verify-account";
import type { VerifyAccountInput } from "@/modules/auth/schemas/verify-account.schema";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { Spinner } from "@/core/components/spinner/spinner";
import { useCountDown } from "@/core/hooks/use-countdown";
import { toast } from "sonner";

type Props = {
  data: VerifyAccountInput;
};

export const VerifyAccount = ({ data }: Props) => {
  const { mutate, isPending } = useVerifyAccount();
  const { seconds, start } = useCountDown(5, () => toast("FINISH"));

  useEffect(() => {
    mutate(data);
  }, [data, mutate]);

  useEffect(() => start(), []);

  return (
    <section className={styles.container}>
      {seconds}
      <div className={styles.iconContainer}>{isPending && <Spinner size="large" />}</div>

      <div className={styles.content}>
        <h2>Verifying your account</h2>

        <p>We’re verifying your account. This will only take a moment.</p>
      </div>
    </section>
  );
};
