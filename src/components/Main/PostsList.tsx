import React, { useState, useEffect, useCallback } from "react";
import { useTypedSelector } from "../../store/IStore";
import { Post } from "../../typescript/interfaces";
import { useDispatch } from "react-redux";
import "./PostsList.scss";
import { fetchPosts } from "../../actions/postsActions";
import { PostSkeleton } from "../misc/PostSkeleton";
import Comments from "./Comments";
import imgPlaceholder from "../../media/placeholder.jpg";

export interface Props {}

const PostsList: React.FC<Props> = () => {
  const [clicked, setClicked] = useState(false);
  const {
    posts: { posts, error, isFetching },
    users,
  } = useTypedSelector((state) => state);
  const [data, setData] = useState<Post[] | null>([]);
  const dispatch = useDispatch();
  const isMoreThanOnePost = posts.length > 1 ? true : false;

  const { selectedUser } = useTypedSelector((state) => state.users);
  const selectedUserId = users.selectedUser?.id;

  useEffect(() => {
    setClicked(false);
  }, [selectedUserId]);

  useEffect(() => {
    clicked ? setData(posts) : setData(posts.slice(0, 1));
  }, [clicked, posts]);

  const onScroll = useCallback(() => {
    if (clicked && !error) {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        dispatch(fetchPosts());
      }
    }
  }, [dispatch, error, clicked]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <>
      {clicked && <p> Scroll to fetch more posts! </p>}
      {data &&
        data.map((post) => {
          return (
            <article key={post.id} className="posts__post">
              <header className="post__header">
                <div className="post__header-wrapperuser">
                  <label htmlFor="">{`${selectedUser?.name}`}</label>
                  <img className="post__img" src={imgPlaceholder} alt="" />
                </div>
                <div className="post__header-wrappertitle">
                  <div className="post__title">{post.title}</div>
                </div>
              </header>
              <main className="post__body">{post.body}</main>
              <Comments postId={post.id} />
            </article>
          );
        })}

      {isFetching ? <PostSkeleton /> : null}
      {!clicked && (
        <button disabled={!isMoreThanOnePost} className="posts__button" onClick={() => setClicked(true)}>
          {isMoreThanOnePost ? "Show more posts" : "No more posts :("}
        </button>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default PostsList;
