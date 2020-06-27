import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Main.scss";
import { ReactComponent as Wave } from "../../media/waves2.svg";
import { useTypedSelector } from "../../store/IStore";
import PostsList from "./PostsList";
import { fetchFirstPosts, userSwitched } from "../../actions/postsActions";
import { PostSkeleton } from "../misc/PostSkeleton";
import { userSwitchedResetComments } from "../../actions/commentsActions";
export interface Props {}

const Main: React.FC<Props> = () => {
  const { posts, users } = useTypedSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSwitched());
    dispatch(userSwitchedResetComments());
  }, [users.selectedUser, dispatch]);

  useEffect(() => {
    dispatch(fetchFirstPosts());
  }, [users.selectedUser, dispatch]);

  return (
    <main className="main">
      <Wave />
      <section className="posts__list">{posts.firstFetch ? <PostsList /> : <PostSkeleton />}</section>
    </main>
  );
};

export default Main;
