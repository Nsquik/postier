import React, { useRef, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./actions/usersActions";
import { useTypedSelector } from "./store/IStore";
import "./index.scss";
import Hero from "./components/Hero/Hero";
export interface Props {}

const App: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.users);
  console.log(state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <Hero>{state.users.length > 0 ? <Hero.Select /> : state.error ? `error: ${state.error}` : "loading..."}</Hero>
    </div>
  );
};

export default App;
