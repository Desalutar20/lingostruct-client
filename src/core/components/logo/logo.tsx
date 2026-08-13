import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <svg className={classNames(styles.logo, className)}>
      <use href={`/sprites.svg#logo`}></use>
    </svg>
  );
};
