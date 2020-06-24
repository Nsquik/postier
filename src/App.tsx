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
  const ref = useRef<HTMLDivElement | null>(null);
  console.log(state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <Hero>{state.users.length > 0 ? <Hero.Select /> : "loading..."}</Hero>
    </div>
  );
};

export default App;

{
  /* <div id="scrollableDiv" className="container" ref={ref} style={{ overflow: "auto", height: "10rem" }}>
<InfiniteScroll
  dataLength={state.users.length}
  next={() => dispatch(fetchUsers())}
  endMessage={"lipa"}
  loader={"loading"}
  hasMore={true}
  scrollableTarget={"scrollableDiv"}
>
  {state.users.map((user) => {
    return <div key={user.id}>{user.first_name}</div>;
  })}
</InfiniteScroll>
</div> */
}
