import { useState, type ReactElement } from "react";
import { Popover as Po } from "@base-ui/react";
import { AppButton } from "@/core/components/app-button/app-button";
import { Ellipsis } from "lucide-react";
import type { Align } from "@base-ui/react/internals/useAnchorPositioning";
import { isButtonType } from "@/core/helpers/is-button-type";

type Props = {
  trigger?: ReactElement | ((open: boolean) => ReactElement);
  renderContent: (close: () => void) => ReactElement;
  align?: Align;
  initialOpen?: boolean;
  sideOffset?: number;
};

export const Popover = ({
  trigger,
  renderContent,
  align = "center",
  initialOpen = false,
  sideOffset = 3,
}: Props) => {
  const [open, setOpen] = useState(initialOpen);

  const triggerElement =
    typeof trigger === "function"
      ? trigger(open)
      : (trigger ?? (
          <AppButton variant="ghost">
            <Ellipsis />
          </AppButton>
        ));

  const nativeButton = isButtonType(triggerElement);

  return (
    <Po.Root open={open} onOpenChange={setOpen}>
      <Po.Trigger nativeButton={nativeButton} render={triggerElement} />
      <Po.Portal>
        <Po.Positioner sideOffset={sideOffset} align={align}>
          <Po.Popup>{renderContent(() => setOpen(false))}</Po.Popup>
        </Po.Positioner>
      </Po.Portal>
    </Po.Root>
  );
};
