import { useState, useCallback, useEffect } from "react";
import { User } from "../typescript/interfaces";
import debounce from "lodash/debounce";
import apiClient from "../api/axios";
import useEffectAfterMount from "./useEffectAfterMount";

const useOnSearchFetch = () => {
  const [inputValue, setinputValue] = useState("");
  const [values, setValues] = useState<User[]>([]);
  const [isSearchFetching, setIsSearchFetching] = useState(false);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setinputValue("");
    setValues([]);
  }, []);

  const setInput = useCallback((value: string) => {
    setinputValue(value);
  }, []);

  const fetch = useCallback((value: string) => {
    setIsSearchFetching(true);

    if (value !== "") {
      apiClient
        .get(`/public-api/users?last_name=${value}`)
        .then((value) => {
          setIsSearchFetching(false);
          return value.data;
        })
        .then((data) => {
          setValues([...data.result]);
        })
        .catch((error) => {
          setIsSearchFetching(false);
          setError(error);
        });
    }
  }, []);
  const debouncedFetch = debounce((value: string) => {
    setError(null);
    setinputValue(value);
    fetch(value);
  }, 1000);

  return {
    searchData: values,
    debouncedOnSearchFetch: debouncedFetch,
    isSearchFetching,
    inputValue,
    reset,
    setInput,
    error,
  };
};

export default useOnSearchFetch;
