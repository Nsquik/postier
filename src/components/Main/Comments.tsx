import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeCommentSection, fetchComments } from "../../actions/commentsActions";
import { useTypedSelector } from "../../store/IStore";

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
  }, [openComments]); // runs only on the first opening of comment section : ]

  return (
    <>
      {openComments && "COMMENTS"}
      <button className="show__comments" onClick={() => setOpenComments((state) => !state)}>
        {openComments ? "Hide comments" : "Show comments"}
      </button>
    </>
  );
});

export default Comments;
