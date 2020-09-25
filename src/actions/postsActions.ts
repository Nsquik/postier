import { AppThunk } from "../typescript/types";
import apiClient from "../api/axios";
import { FETCH_POSTS_REQUEST, PostsTypes, FETCH_POSTS_ERROR, FETCH_POSTS, FETCH_FIRST_POSTS } from "./postsActionTypes";

export const fetchPosts = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch<FETCH_POSTS_REQUEST>({ type: PostsTypes.FETCH_POSTS_REQUEST, payload: true });
    const currPage = getState().posts.lastMeta?.pagination?.page;

    if (currPage !== undefined && currPage === getState().posts.lastMeta?.pagination.pages) {
      throw new Error("No more content to fetch");
    }
    const pageToFetch = currPage ? currPage + 1 : 1;

    const selectedUser = getState().users?.selectedUser;

    if (selectedUser) {
      const { data } = await apiClient.get(
        `https://gorest.co.in/public-api/posts?page=${pageToFetch}&user_id=${selectedUser.id}`
      );
      dispatch<FETCH_POSTS>({ type: PostsTypes.FETCH_POSTS, payload: { _meta: data.meta, result: data.data } });
    } else {
      throw new Error("No selected user");
    }
  } catch (error) {
    dispatch<FETCH_POSTS_ERROR>({ type: PostsTypes.FETCH_POSTS_ERROR, payload: error.message });
  }
};

export const fetchFirstPosts = (): AppThunk => async (dispatch, getState) => {
  try {
    const selectedUser = getState().users?.selectedUser;

    if (selectedUser) {
      const { data } = await apiClient.get(`https://gorest.co.in/public-api/posts?page=1&user_id=${selectedUser.id}`);

      dispatch<FETCH_FIRST_POSTS>({
        type: PostsTypes.FETCH_FIRST_POSTS,
        payload: { _meta: data.meta, result: data.data },
      });
    } else {
      throw new Error("No selected user");
    }
  } catch (error) {
    dispatch<FETCH_POSTS_ERROR>({ type: PostsTypes.FETCH_POSTS_ERROR, payload: error.message });
  }
};

export const userSwitched = () => {
  return {
    type: PostsTypes.USER_SWITCHED,
    payload: null,
  };
};
