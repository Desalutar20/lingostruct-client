import classNames from "classnames";
import styles from "./styles.module.css";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";
import { AppButton } from "@/core/components/app-button/app-button";
import { LucideUnlockKeyhole } from "lucide-react";

const content = {
  register: {
    text: "Already have an account?",
    linkText: "Log in",
    to: ROUTES.auth.signIn.href,
  },
  login: {
    text: "Not registered yet?",
    linkText: "Create an Account",
    to: ROUTES.auth.signUp.href,
  },
  forgotPassword: {
    text: "Didn't received the email?",
    linkText: "Click to resend.",
    to: "/",
  },
} as const;

type Props = {
  className?: string;
  type:
    | Exclude<keyof typeof content, "forgotPassword">
    | {
        type: Extract<keyof typeof content, "forgotPassword">;
        onClick: () => void | Promise<void>;
      };
};

export const AuthNavigation = ({ className, type }: Props) => {
  const t = typeof type === "string" ? type : type.type;
  const { text, linkText, to } = content[t];

  return (
    <div className={classNames(className, styles.container)}>
      <span>{text}</span>
      {typeof type !== "string" ? (
        <AppButton type="button" variant="ghost" onClick={type.onClick}>
          {linkText}
        </AppButton>
      ) : (
        <Link to={to}>{linkText}</Link>
      )}
    </div>
  );
};
