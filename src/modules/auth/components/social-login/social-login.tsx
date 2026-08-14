import classNames from "classnames";
import styles from "./styles.module.css";
import { config } from "@/config";
import { AppButton } from "@/core/components/app-button/app-button";

const providers = [
  {
    href: "/sprites.svg#google",
    provider: "google",
    label: "Continue with Google",
  },
  {
    href: "/sprites.svg#github",
    provider: "github",
    label: "Continue with GitHub",
  },
] as const;

type Props = {
  className?: string;
  redirectPath?: string;
};

export const SocialLogin = ({ className, redirectPath }: Props) => {
  return (
    <div className={classNames(className, styles.container)}>
      <div className={styles.divider}>
        <span>or continue with</span>
      </div>
      <div className={styles.socials}>
        {providers.map(({ href, provider, label }) => (
          <form key={provider} action={`${config.apiUrl}${config.apiPrefix}/auth/${provider}`}>
            {redirectPath && <input type="hidden" name="redirectPath" value={redirectPath} />}
            <AppButton className={styles.button} aria-label={label} variant="ghost">
              <svg className={styles.icon}>
                <use href={href}></use>
              </svg>
            </AppButton>
          </form>
        ))}
      </div>
    </div>
  );
};
