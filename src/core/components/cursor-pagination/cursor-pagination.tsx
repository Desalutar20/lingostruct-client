import classNames from "classnames";
import styles from "./styles.module.css";
import { AppButton } from "@/core/components/app-button/app-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CursorPaginatedResponse } from "@/core/lib/api";

type Props = {
  className?: string;
  prevCursor: CursorPaginatedResponse<unknown>["prevCursor"];
  nextCursor: CursorPaginatedResponse<unknown>["nextCursor"];
  disabled?: boolean;
  onPrevClick: (cursor: NonNullable<CursorPaginatedResponse<unknown>["prevCursor"]>) => void;
  onNextClick: (cursor: NonNullable<CursorPaginatedResponse<unknown>["prevCursor"]>) => void;
};

export const CursorPagination = ({
  className,
  prevCursor,
  nextCursor,
  disabled,
  onPrevClick,
  onNextClick,
}: Props) => {
  if (prevCursor === null && nextCursor === null) return null;

  return (
    <div className={classNames(styles.container, className)}>
      <AppButton
        className={styles.button}
        onClick={() => {
          if (prevCursor === null) return;
          onPrevClick(prevCursor);
        }}
        disabled={disabled || prevCursor === null}
        variant="ghost"
      >
        <ChevronLeft />
      </AppButton>
      <AppButton
        className={styles.button}
        onClick={() => {
          if (nextCursor === null) return;
          onNextClick(nextCursor);
        }}
        disabled={disabled || nextCursor === null}
        variant="ghost"
      >
        <ChevronRight />
      </AppButton>
    </div>
  );
};
