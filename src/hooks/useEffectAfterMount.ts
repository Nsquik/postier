import { useEffect, useRef } from "react";

const useEffectAfterMount = (cb: any, deps: any[]) => {
  const componentJustMounted = useRef(true);
  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }
    componentJustMounted.current = false;
    // It thinks that deps isn't array bruh....
    //eslint-disable-next-line
  }, deps as []);
};

export default useEffectAfterMount;
