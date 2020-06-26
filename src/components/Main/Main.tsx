import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Main.scss";
import { ReactComponent as Wave } from "../../media/waves2.svg";
import { useTypedSelector } from "../../store/IStore";
import { fetchPosts, userSwitched } from "../../actions/postsActions";
export interface Props {}

const Main: React.FC<Props> = () => {
  const { posts, users } = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSwitched());
    dispatch(fetchPosts());
  }, [users.selectedUser]);
  return (
    <main className="main">
      {" "}
      <Wave />
      Main.{" "}
    </main>
  );
};

export default Main;
