import {
  CommentsTypes,
  FETCH_COMMENTS_ERROR,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS,
  ADD_COMMENT,
} from "./commentsActionTypes";
import { AppThunk } from "../typescript/types";
import apiClient from "../api/axios";

export const initializeCommentSection = (postId: number) => {
  return {
    type: CommentsTypes.INITIALIZE_COMMENT_SECTION,
    payload: postId,
  };
};

export const fetchComments = (postId: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch<FETCH_COMMENTS_REQUEST>({ type: CommentsTypes.FETCH_COMMENTS_REQUEST, payload: postId });

    const currPage = getState().comments.posts[postId].lastMeta?.currentPage;

    if (
      (currPage !== undefined && currPage === getState().comments.posts[postId].lastMeta?.pageCount) ||
      getState().comments.posts[postId].lastMeta?.pageCount === 0
    ) {
      throw new Error("No more comments to fetch");
    }

    const pageToFetch = currPage ? currPage + 1 : 1;

    const { data } = await apiClient.get(
      `https://gorest.co.in/public-api/comments?post_id=${postId}&page=${pageToFetch}`
    );

    dispatch<FETCH_COMMENTS>({
      type: CommentsTypes.FETCH_COMMENTS,
      payload: { _meta: data.meta, result: data.data, postId: postId },
    });
  } catch (error) {
    dispatch<FETCH_COMMENTS_ERROR>({
      type: CommentsTypes.FETCH_COMMENTS_ERROR,
      payload: { error: error.message, postId: postId },
    });
  }
};

export const addComment = (
  postId: number,
  values: {
    name: string;
    email: string;
    body: string;
  }
): AppThunk => async (dispatch) => {
  try {
    const body = { ...values, post_id: postId };

    const { data } = await apiClient.post("https://gorest.co.in/public-api/comments", body);

    dispatch<ADD_COMMENT>({
      type: CommentsTypes.ADD_COMMENT,
      payload: { result: data.data, postId: postId },
    });
  } catch (error) {
    console.log(error);
  }
};

export const userSwitchedResetComments = () => {
  return {
    type: CommentsTypes.USER_SWITCHED,
    payload: null,
  };
};
