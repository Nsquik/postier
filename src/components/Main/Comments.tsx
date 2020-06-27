import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCommentSection, fetchComments } from "../../actions/commentsActions";
import { useTypedSelector } from "../../store/IStore";

export interface Props {
  postId: number;
}

const Comments: React.FC<Props> = React.memo(({ postId }) => {
  const dispatch = useDispatch();
  const comments = useTypedSelector((state) => state.comments);

  useEffect(() => {
    console.log("...");

    if (!comments.posts[postId]?.initialized) {
      dispatch(initializeCommentSection(postId));
      dispatch(fetchComments(postId));
    } else {
      dispatch(fetchComments(postId));
    }
  }, []);

  useEffect(() => {}, []);

  return <div> Comment</div>;
});

export default Comments;
