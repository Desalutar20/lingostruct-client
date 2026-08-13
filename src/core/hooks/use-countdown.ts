import { useEffect, useState } from "react";

export const useCountDown = (initialSeconds: number, onSuccess?: () => void) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isStarted, setIsStarted] = useState(false);

  const start = () => {
    if (isStarted) return;

    setIsStarted(true);
  };

  useEffect(() => {
    if (!isStarted) return;

    const timerId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsStarted(false);

          onSuccess?.();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isStarted, onSuccess]);

  return {
    start,
    seconds,
  };
};
