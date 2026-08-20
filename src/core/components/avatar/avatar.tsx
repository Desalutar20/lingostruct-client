import { Avatar as avatar } from "@base-ui/react/avatar";
import styles from "./styles.module.css";
import classNames from "classnames";
type Props = {
  className?: string;
  imageUrl?: string;
  fallback: string;
};

export const Avatar = ({ className, imageUrl, fallback }: Props) => {
  return (
    <avatar.Root className={classNames(styles.container, className)}>
      <avatar.Image src={imageUrl} width="40" height="40" />
      <avatar.Fallback delay={600} className={styles.fallback}>
        {fallback}
      </avatar.Fallback>
    </avatar.Root>
  );
};
