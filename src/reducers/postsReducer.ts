import { PostState } from "../typescript/interfaces";
import { PostsActionTypes, PostsTypes } from "../actions/postsActionTypes";

const initialState: PostState = {
  posts: [],
  error: null,
  isFetching: false,
  lastMeta: null,
  firstFetch: false,
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostState => {
  switch (action.type) {
    case PostsTypes.FETCH_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.result],
        isFetching: false,
        lastMeta: action.payload._meta,
      };
    case PostsTypes.FETCH_FIRST_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.result],
        lastMeta: action.payload._meta,
        firstFetch: true,
      };

    case PostsTypes.USER_SWITCHED:
      return { ...state, lastMeta: action.payload, posts: [], firstFetch: false, error: null };
    case PostsTypes.FETCH_POSTS_REQUEST:
      return { ...state, isFetching: true };
    case PostsTypes.FETCH_POSTS_ERROR:
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
