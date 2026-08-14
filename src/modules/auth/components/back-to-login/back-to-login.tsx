import { ChevronLeft } from "lucide-react";

import styles from "./styles.module.css";
import classNames from "classnames";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";

type Props = {
  className?: string;
};

export const BackToLogin = ({ className }: Props) => (
  <Link to={ROUTES.auth.signIn.href} className={classNames(className, styles.link)}>
    <ChevronLeft size={12} />
    Back to Login
  </Link>
);
