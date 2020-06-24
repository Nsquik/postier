import { useState, useCallback } from "react";
import { User } from "../typescript/interfaces";
import debounce from "lodash/debounce";
import apiClient from "../api/axios";

const useOnSearchFetch = () => {
  const [inputValue, setinputValue] = useState("");
  const [values, setValues] = useState<User[]>([]);
  const [isSearchFetching, setIsSearchFetching] = useState(false);

  const reset = useCallback(() => {
    setinputValue("");
    setValues([]);
  }, []);

  const fetch = useCallback((value: string) => {
    apiClient
      .get(`/public-api/users?last_name=${value}`)
      .then((value) => {
        setIsSearchFetching(false);
        return value.data;
      })
      .then((data) => {
        setValues([...data.result]);
      });
  }, []);
  const debouncedFetch = debounce(fetch, 1000);
  const onSearchFetch = useCallback(
    (value: string) => {
      setinputValue(value);
      if (value !== "") {
        setIsSearchFetching(true);
        debouncedFetch(value);
      }
      setValues([]);
    },
    [setValues, debouncedFetch]
  );

  return { searchData: values, debouncedOnSearchFetch: onSearchFetch, isSearchFetching, inputValue, reset };
};

export default useOnSearchFetch;
