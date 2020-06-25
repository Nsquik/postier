import { AppThunk } from "../typescript/types";
import apiClient from "../api/axios";
import { FETCH_POSTS_REQUEST, PostsTypes, FETCH_POSTS_ERROR, FETCH_POSTS } from "./postsActionTypes";

export const fetchPosts = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch<FETCH_POSTS_REQUEST>({ type: PostsTypes.FETCH_POSTS_REQUEST, payload: true });
    const currPage = getState().posts.lastMeta?.currentPage;

    if (currPage !== undefined && currPage === getState().posts.lastMeta?.pageCount) {
      throw new Error("No more content to fetch");
    }
    const pageToFetch = currPage ? currPage + 1 : 1;

    const selectedUser = getState().users?.selectedUser;

    if (selectedUser) {
      const { data } = await apiClient.get(
        `https://gorest.co.in/public-api/posts?page=${pageToFetch}&user_id=${selectedUser.id}`
      );
      dispatch<FETCH_POSTS>({ type: PostsTypes.FETCH_POSTS, payload: { _meta: data._meta, result: data.result } });
    } else {
      throw new Error("No selected user");
    }
  } catch (error) {
    console.log(error);
    dispatch<FETCH_POSTS_ERROR>({ type: PostsTypes.FETCH_POSTS_ERROR, payload: error });
  }
};
