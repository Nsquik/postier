import { Post, Meta } from "../typescript/interfaces";

export enum PostsTypes {
  FETCH_FIRST_POST = "FETCH_FIRST_POST",
  FETCH_POSTS = "FETCH_POSTS",
  FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST",
  FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR",
  USER_SWITCHED = "USER_SWITCHED",
}

export type FETCH_POSTS = { type: PostsTypes.FETCH_POSTS; payload: { _meta: Meta; result: Post[] } };
export type FETCH_POSTS_REQUEST = { type: PostsTypes.FETCH_POSTS_REQUEST; payload: boolean };
export type FETCH_POSTS_ERROR = { type: PostsTypes.FETCH_POSTS_ERROR; payload: Error };
export type USER_SWITCHED = { type: PostsTypes.USER_SWITCHED; payload: null };

export type PostsActionTypes = FETCH_POSTS | FETCH_POSTS_ERROR | FETCH_POSTS_REQUEST | USER_SWITCHED;
