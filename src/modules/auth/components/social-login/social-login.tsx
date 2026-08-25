import classNames from "classnames";
import styles from "./styles.module.css";
import { config } from "@/config";

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
        {providers.map(({ href, provider, label }) => {
          const url = new URL(`${config.apiPrefix}/auth/${provider}`, config.apiUrl);

          if (redirectPath) {
            url.searchParams.set("redirectPath", redirectPath);
          }

          return (
            <a
              key={provider}
              href={`${config.apiUrl}${config.apiPrefix}/auth/${provider}`}
              aria-label={label}
              className={styles.button}
            >
              <svg className={styles.icon}>
                <use href={href}></use>
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
};
