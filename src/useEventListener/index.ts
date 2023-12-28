import { useEffect } from "react";
import useLatest from "../useLatest";
import { BasicTarget } from "../types";

function useEventListener(event: string, handler: (...e: any) => void, target: BasicTarget) {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    // 支持 useRef 和 DOM节点
    let targetElement: any;

    if (!target) {
      targetElement = window;
    } else if ("current" in target) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }

    //  防止没有 addEventListener 这个属性
    if (!targetElement?.addEventListener) return;

    const eventListener = (event: Event) => {
      handlerRef.current(event);
    };

    targetElement.addEventListener(event, eventListener);

    return () => {
      targetElement.removeEventListener(event, eventListener);
    };
  }, [target, event]);
}

export default useEventListener;
