import { CommentState } from "../typescript/interfaces";
import { CommentsActionTypes } from "../actions/commentsActionTypes";

const initialState: CommentState = {
  posts: {},
};

export const commentsReducer = (state = initialState, action: CommentsActionTypes): CommentState => {
  switch (action.type) {
    default:
      return state;
  }
};
