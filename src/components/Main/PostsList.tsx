import React, { useState, useEffect, useCallback } from "react";
import { useTypedSelector } from "../../store/IStore";
import { Post } from "../../typescript/interfaces";
import { useDispatch } from "react-redux";
import "./PostsList.scss";
import { fetchPosts } from "../../actions/postsActions";
import { PostSkeleton } from "../misc/PostSkeleton";
import Comments from "./Comments";

export interface Props {}

const PostsList: React.FC<Props> = () => {
  const [state, setState] = useState(false);
  const { posts, users } = useTypedSelector((state) => state);
  const [data, setData] = useState<Post[]>([]);
  const dispatch = useDispatch();
  const isMoreThanOnePost = posts.posts.length > 1 ? true : false;

  const { selectedUser } = useTypedSelector((state) => state.users);

  useEffect(() => {
    setState(false);
  }, [users.selectedUser]);

  useEffect(() => {
    state ? setData(posts.posts) : setData([posts.posts[0]]);
  }, [state, posts.posts]);

  const onScroll = useCallback(() => {
    if (state && !posts.error) {
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
  }, [dispatch, posts.error, state]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <>
      {state && <p> Scroll to fetch more posts! </p>}
      {data.map((post) => {
        return (
          <article key={post.id} className="posts__post">
            <header className="post__header">
              <div className="post__header-wrapperuser">
                <label htmlFor="">{`${selectedUser?.first_name} ${selectedUser?.last_name}`}</label>
                <img className="post__img" src={selectedUser?._links?.avatar.href} alt="" />
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

      {posts.isFetching ? <PostSkeleton /> : null}
      {!state && (
        <button disabled={!isMoreThanOnePost} className="posts__button" onClick={() => setState(true)}>
          {isMoreThanOnePost ? "Show more posts" : "No more posts :("}
        </button>
      )}
      {posts.error && <p>{posts.error}</p>}
    </>
  );
};

export default PostsList;
