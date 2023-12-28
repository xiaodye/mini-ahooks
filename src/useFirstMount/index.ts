import { useRef } from "react";

function useFirstMount(): boolean {
  const firstRef = useRef(true);

  if (firstRef.current) {
    firstRef.current = false;
    return true;
  }

  return firstRef.current;
}

export default useFirstMount;
