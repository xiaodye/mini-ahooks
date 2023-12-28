import { useEffect, DependencyList } from "react";
import useFirstMount from "../useFirstMount";

function useUpdateEffect(effect: () => void, deps: DependencyList): void {
  const isFirst = useFirstMount();

  useEffect(() => {
    if (!isFirst) {
      effect();
    }
  }, deps);
}

export default useUpdateEffect;
