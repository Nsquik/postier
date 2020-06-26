import { CommentState } from "../typescript/interfaces";
import { CommentsActionTypes, CommentsTypes } from "../actions/commentsActionTypes";

const initialState: CommentState = {
  posts: {},
};

export const commentsReducer = (state = initialState, action: CommentsActionTypes): CommentState => {
  switch (action.type) {
    case CommentsTypes.INITIALIZE_COMMENT_SECTION:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload]: { comments: [], isFetching: false, error: null, lastMeta: undefined },
        },
      };

    default:
      return state;
  }
};
