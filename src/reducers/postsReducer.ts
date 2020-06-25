import { PostState, Post } from "../typescript/interfaces";
import { PostsActionTypes } from "../actions/postsActionTypes";

const initialState: PostState = {
  posts: [],
  error: null,
  isFetching: false,
  lastMeta: null,
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostState => {
  switch (action.type) {
    default:
      return state;
  }
};
