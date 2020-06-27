import { Comment, Meta } from "../typescript/interfaces";

export enum CommentsTypes {
  INITIALIZE_COMMENT_SECTION = "INITIALIZE_COMMENT_SECTION",
  FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST",
  FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR",
  FETCH_COMMENTS = "FETCH_COMMENTS",
  USER_SWITCHED = "USER_SWITCHED",
}

export type INITIALIZE_COMMENT_SECTION = { type: CommentsTypes.INITIALIZE_COMMENT_SECTION; payload: number };
export type FETCH_COMMENTS_REQUEST = { type: CommentsTypes.FETCH_COMMENTS_REQUEST; payload: number };
export type FETCH_COMMENTS_ERROR = {
  type: CommentsTypes.FETCH_COMMENTS_ERROR;
  payload: { postId: number; error: string };
};
export type FETCH_COMMENTS = {
  type: CommentsTypes.FETCH_COMMENTS;
  payload: { _meta: Meta; result: Comment[]; postId: number };
};
export type USER_SWITCHED = {
  type: CommentsTypes.USER_SWITCHED;
  payload: null;
};

export type CommentsActionTypes =
  | INITIALIZE_COMMENT_SECTION
  | FETCH_COMMENTS
  | FETCH_COMMENTS_ERROR
  | FETCH_COMMENTS_REQUEST
  | USER_SWITCHED;
