import { AlertDialog as AD } from "@base-ui/react/alert-dialog";
import styles from "./styles.module.css";
import { useState, type ReactElement, type ReactNode } from "react";
import { isButtonType } from "@/core/helpers/is-button-type";
import { AppButton } from "@/core/components/app-button/app-button";

type Props = {
  trigger: ReactElement | ((open: boolean) => ReactElement);
  title: string;
  description: string;
  onContinue: () => void | Promise<void>;
  initialOpen?: boolean;
  discardText?: ReactNode;
  continueText?: ReactNode;
  disabled?: boolean;
};

export const AlertDialog = ({
  trigger,
  title,
  description,
  onContinue,
  initialOpen = false,
  discardText = "Discard",
  continueText = "Continue",
  disabled = false,
}: Props) => {
  const [open, setOpen] = useState(initialOpen);
  const triggerElement = typeof trigger === "function" ? trigger(open) : trigger;

  const nativeButton = isButtonType(triggerElement);

  const onClick = async () => {
    const result = onContinue();
    if (result instanceof Promise) {
      await result;
    }

    setOpen(false);
  };

  return (
    <AD.Root open={open} onOpenChange={setOpen}>
      <AD.Trigger render={triggerElement} nativeButton={nativeButton} />
      <AD.Portal>
        <AD.Backdrop className={styles.backdrop} />
        <AD.Popup className={styles.popup}>
          <div className={styles.intro}>
            <AD.Title className={styles.title}>{title}</AD.Title>
            <AD.Description className={styles.description}>{description}</AD.Description>
          </div>
          <div className={styles.actions}>
            <AD.Close
              disabled={disabled}
              className={styles.button}
              render={<AppButton variant="secondary">{discardText}</AppButton>}
            />

            <AppButton disabled={disabled} onClick={onClick} variant="destructive">
              {continueText}
            </AppButton>
          </div>
        </AD.Popup>
      </AD.Portal>
    </AD.Root>
  );
};
