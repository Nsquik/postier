import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Main.scss";
import { ReactComponent as Wave } from "../../media/waves2.svg";
import { useTypedSelector } from "../../store/IStore";
import PostsList from "./PostsList";
import { fetchFirstPosts } from "../../actions/postsActions";
import { PostSkeleton } from "../misc/PostSkeleton";
import { scroller, Element } from "react-scroll";
import RenameUser from "./RenameUser";
export interface Props {}

const Main: React.FC<Props> = () => {
  const { posts, users } = useTypedSelector((state) => state);

  const dispatch = useDispatch();
  const selectedUserId = users.selectedUser?.id;

  useEffect(() => {
    scroller.scrollTo("scroll-to", {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutCubic",
    });
    dispatch(fetchFirstPosts());
  }, [dispatch, selectedUserId]);

  return (
    <main className="main">
      <Wave />

      <Element name="scroll-to">
        <section id="main" className="posts__list">
          <h1>Change selected user name</h1>
          <RenameUser />

          {posts.firstFetch ? <PostsList /> : <PostSkeleton />}
        </section>
      </Element>
    </main>
  );
};

export default Main;
