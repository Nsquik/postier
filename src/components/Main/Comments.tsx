import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeCommentSection, fetchComments } from "../../actions/commentsActions";
import { useTypedSelector } from "../../store/IStore";
import { SearchSkeleton } from "../misc/SearchSkeleton";
import "./Comments.scss";
import AddCommentForm from "./AddCommentForm";

export interface Props {
  postId: number;
}

const Comments: React.FC<Props> = React.memo(({ postId }) => {
  const dispatch = useDispatch();
  const comments = useTypedSelector((state) => state.comments);
  const [openComments, setOpenComments] = useState(false);

  useEffect(() => {
    if (openComments && !comments.posts[postId]?.initialized) {
      dispatch(initializeCommentSection(postId));
      dispatch(fetchComments(postId));
    }
  }, [openComments, dispatch, postId, comments.posts]); // runs only on the first opening of comment section : ]

  const renderComments = () => {
    if (comments.posts[postId]?.initialized) {
      return comments.posts[postId].comments?.length ? (
        comments.posts[postId].comments?.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              <p className="comment__author">
                {comment.name} <span className="comment__email">({comment.email})</span>
              </p>
              {comment.body}
            </div>
          );
        })
      ) : !comments.posts[postId]?.isFetching ? (
        <p style={{ margin: "0 auto", padding: "2rem" }}>No comments yet</p>
      ) : null;
    }
  };

  return (
    <>
      {openComments && (
        <section className="comments">
          <button
            disabled={comments.posts[postId]?.error ? true : false}
            className={`button__fetch ${comments.posts[postId]?.error ? "button__fetch-error" : null}`}
            onClick={() => dispatch(fetchComments(postId))}
          >
            {comments.posts[postId]?.error ? "That's all the comments I could fetch :(" : "fetch more comments..."}
          </button>
          {comments.posts[postId]?.isFetching && (
            <div style={{ padding: "1rem" }}>
              <SearchSkeleton />
            </div>
          )}
          {renderComments()}
          <AddCommentForm postId={postId} />
        </section>
      )}

      <button className="show__comments" onClick={() => setOpenComments((state) => !state)}>
        {openComments ? "Hide comments" : "Show comments"}
      </button>
    </>
  );
});

export default Comments;
