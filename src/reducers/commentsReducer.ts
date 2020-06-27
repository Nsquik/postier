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
          [action.payload]: { comments: [], isFetching: false, error: null, lastMeta: null, initialized: true },
        },
      };
    case CommentsTypes.FETCH_COMMENTS: // i should've probably used immer for this but it was a good practice = )
      console.log(action.payload.result);

      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: [...state.posts[action.payload.postId].comments, ...action.payload.result],
            isFetching: false,
            lastMeta: action.payload._meta,
          },
        },
      };

    case CommentsTypes.FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload]: {
            ...state.posts[action.payload],
            isFetching: true,
          },
        },
      };

    case CommentsTypes.FETCH_COMMENTS_ERROR:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            error: action.payload.error,
            isFetching: false,
          },
        },
      };

    case CommentsTypes.USER_SWITCHED:
      return { posts: {} };

    default:
      return state;
  }
};
