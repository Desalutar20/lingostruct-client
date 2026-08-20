import { useLocation, useNavigate } from "@tanstack/react-router";
import styles from "./styles.module.css";
import classNames from "classnames";
import { ROUTES } from "@/core/const/routes.const";

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <svg
      onClick={() =>
        navigate({ to: pathname.startsWith("/admin") ? "/admin" : ROUTES.workspaces.root.href })
      }
      className={classNames(styles.logo, className)}
    >
      <use href={`/sprites.svg#logo`}></use>
    </svg>
  );
};
