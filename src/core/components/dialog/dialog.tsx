import { Dialog as Dg } from "@base-ui/react/dialog";
import styles from "./styles.module.css";
import { useState, type ReactElement } from "react";
import { isButtonType } from "@/core/helpers/is-button-type";
import { AppButton } from "@/core/components/app-button/app-button";
import { X } from "lucide-react";
import classNames from "classnames";

type Props = {
  trigger?: ReactElement | ((open: boolean) => ReactElement);
  close?: ReactElement;
  renderContent: (close: () => void) => ReactElement;
  initialOpen?: boolean;
  className?: string;
};

export const Dialog = ({
  trigger,
  renderContent,
  close,
  className,
  initialOpen = false,
}: Props) => {
  const [open, setOpen] = useState(initialOpen);

  const triggerElement = typeof trigger === "function" ? trigger(open) : trigger;
  const closeElement = (
    <div>
      {close ?? (
        <AppButton className={styles.close} variant="ghost">
          <X />
        </AppButton>
      )}
    </div>
  );

  const nativeButton = isButtonType(triggerElement);

  return (
    <Dg.Root open={open} onOpenChange={setOpen}>
      {trigger && <Dg.Trigger nativeButton={nativeButton} render={triggerElement} />}
      <Dg.Portal>
        <Dg.Backdrop className={styles.backdrop} />
        <Dg.Popup className={classNames(styles.popup, className)}>
          <Dg.Close className={styles.close} nativeButton={false} render={closeElement} />

          {renderContent(() => setOpen(false))}
        </Dg.Popup>
      </Dg.Portal>
    </Dg.Root>
  );
};
