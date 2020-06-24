import { useEffect, useRef } from "react";

const useEffectAfterMount = (cb: any, deps: any) => {
  const componentJustMounted = useRef(true);
  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }
    componentJustMounted.current = false;
  }, [cb, deps]);
};

export default useEffectAfterMount;
