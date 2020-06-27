import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Main.scss";
import { ReactComponent as Wave } from "../../media/waves2.svg";
import { useTypedSelector } from "../../store/IStore";
import PostsList from "./PostsList";
import { fetchFirstPosts, userSwitched } from "../../actions/postsActions";
import { PostSkeleton } from "../misc/PostSkeleton";
import { userSwitchedResetComments } from "../../actions/commentsActions";
import { scroller, Element } from "react-scroll";
export interface Props {}

const Main: React.FC<Props> = () => {
  const { posts, users } = useTypedSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSwitched());
    dispatch(userSwitchedResetComments());
  }, [users.selectedUser, dispatch]);

  useEffect(() => {
    scroller.scrollTo("scroll-to", {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutCubic",
    });
    dispatch(fetchFirstPosts());
  }, [users.selectedUser, dispatch]);

  return (
    <main className="main">
      <Wave />

      <Element name="scroll-to">
        <section id="main" className="posts__list">
          {posts.firstFetch ? <PostsList /> : <PostSkeleton />}
        </section>
      </Element>
    </main>
  );
};

export default Main;
