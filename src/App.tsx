import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./actions/usersActions";
import { useTypedSelector } from "./store/IStore";
import "./index.scss";
import Hero from "./components/Hero/Hero";
import { InputSkeleton } from "./components/misc/InputSkeleton";

export interface Props {}

const App: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Hero>
        {state.users.length > 0 ? <Hero.Select /> : state.error ? `error: ${state.error}` : <InputSkeleton />}
      </Hero>
    </div>
  );
};

export default App;
