import { useState } from "react";
import useEventListener from "../useEventListener";
import type { BasicTarget } from "../types";

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHover: boolean) => void;
}

const useHover = (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options ?? {};
  const [isHover, setIsHover] = useState(false);

  useEventListener(
    "mouseenter",
    () => {
      onEnter?.();
      onChange?.(true);
      setIsHover(true);
    },
    target
  );

  useEventListener(
    "mouseleave",
    () => {
      onLeave?.();
      onChange?.(false);
      setIsHover(false);
    },
    target
  );

  return isHover;
};

export default useHover;
