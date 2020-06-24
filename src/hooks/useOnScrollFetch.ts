import { useState, useEffect, useCallback } from "react";
import { useTypedSelector } from "../store/IStore";

type scrollEvent = {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
};

const useOnScrollFetch = () => {
  const [values, setValues] = useState<scrollEvent | null>(null);
  const { isFetching } = useTypedSelector((state) => state.users);

  const onScroll = useCallback(
    (scrollTop: number, clientHeight: number, scrollHeight: number) => {
      console.log(scrollTop);

      !isFetching && setValues({ scrollTop, clientHeight, scrollHeight });
    },
    [setValues, isFetching]
  );
  return { values, onScroll };
};

export default useOnScrollFetch;
