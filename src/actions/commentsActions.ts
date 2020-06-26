import { CommentsTypes } from "./commentsActionTypes";

export const initializeCommentSection = (postId: number) => {
  return {
    type: CommentsTypes.INITIALIZE_COMMENT_SECTION,
    payload: postId,
  };
};
