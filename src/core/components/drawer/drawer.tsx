import { Drawer as Dw } from "@base-ui/react/drawer";
import styles from "./styles.module.css";
import { useState, type ReactElement } from "react";
import { isButtonType } from "@/core/helpers/is-button-type";
import classNames from "classnames";

type Props = {
  trigger: ReactElement | ((open: boolean) => ReactElement);
  renderContent: (close: () => void) => ReactElement;
  initialOpen?: boolean;
  className?: string;
  swipeDirection?: "up" | "down" | "left" | "right";
};

export const Drawer = ({
  trigger,
  renderContent,
  className,
  initialOpen = false,
  swipeDirection = "right",
}: Props) => {
  const [open, setOpen] = useState(initialOpen);

  const triggerElement = typeof trigger === "function" ? trigger(open) : trigger;
  const nativeButton = isButtonType(triggerElement);

  return (
    <Dw.Root open={open} onOpenChange={setOpen} swipeDirection={swipeDirection}>
      <Dw.Trigger nativeButton={nativeButton} render={triggerElement} />
      <Dw.Portal>
        <Dw.Backdrop className={styles.backdrop} />
        <Dw.Viewport className={styles.viewport}>
          <Dw.Popup className={classNames(styles.popup, className)}>
            {renderContent(() => setOpen(false))}
          </Dw.Popup>
        </Dw.Viewport>
      </Dw.Portal>
    </Dw.Root>
  );
};
