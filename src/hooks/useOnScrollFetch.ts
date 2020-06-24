import { useState, useCallback } from "react";
import { useTypedSelector } from "../store/IStore";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../actions/usersActions";
import useEffectAfterMount from "./useEffectAfterMount";

type scrollEvent = {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
};

const useOnScrollFetch = () => {
  const [values, setValues] = useState<scrollEvent>({ scrollTop: 1, clientHeight: 1, scrollHeight: 1 });
  const { isFetching } = useTypedSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffectAfterMount(() => {
    const clientHeightAndScrollTop = values?.clientHeight + values?.scrollTop;

    if (clientHeightAndScrollTop === values?.scrollHeight || values?.scrollHeight - clientHeightAndScrollTop < 1) {
      dispatch(fetchUsers());
    }
  }, [values]);

  const onScroll = useCallback(
    (scrollTop: number, clientHeight: number, scrollHeight: number) => {
      !isFetching && setValues({ scrollTop, clientHeight, scrollHeight });
    },
    [setValues, isFetching]
  );
  return { values, onScroll };
};

export default useOnScrollFetch;
