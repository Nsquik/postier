import { PostState } from "../typescript/interfaces";
import { PostsActionTypes, PostsTypes } from "../actions/postsActionTypes";

const initialState: PostState = {
  posts: [],
  error: null,
  isFetching: false,
  lastMeta: null,
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostState => {
  switch (action.type) {
    case PostsTypes.FETCH_POSTS:
      return {
        ...state,
        posts: { ...state.posts, ...action.payload.result },
        isFetching: false,
        lastMeta: action.payload._meta,
      };
    case PostsTypes.USER_SWITCHED:
      return { ...state, lastMeta: action.payload, posts: [] };

    default:
      return state;
  }
};
