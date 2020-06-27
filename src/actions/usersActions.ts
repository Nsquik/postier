import { AppThunk } from "../typescript/types";
import { FETCH_USERS, UsersTypes, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, SELECT_USER } from "./usersActionTypes";
import { apiClient } from "../api/axios";
import { User } from "../typescript/interfaces";
import { USER_SWITCHED, PostsTypes } from "./postsActionTypes";
import { USER_SWITCHED as USER_SWITCHED_COMM, CommentsTypes } from "./commentsActionTypes";

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch<FETCH_USERS_REQUEST>({ type: UsersTypes.FETCH_USERS_REQUEST, payload: true });

    const currPage = getState().users.lastMeta?.currentPage;
    if (currPage !== undefined && currPage === getState().users.lastMeta?.pageCount) {
      throw new Error("No more content to fetch");
    }
    const pageToFetch = currPage ? currPage + 1 : 1;

    const { data } = await apiClient.get(`/public-api/users?page=${pageToFetch}`);
    dispatch<FETCH_USERS>({ type: UsersTypes.FETCH_USERS, payload: { _meta: data._meta, users: data.result } });
  } catch (err) {
    dispatch<FETCH_USERS_FAILURE>({ type: UsersTypes.FETCH_USERS_FAILURE, payload: err });
  }
};

export const selectUser = (user: User): AppThunk => (dispatch, getState) => {
  dispatch<USER_SWITCHED>({ type: PostsTypes.USER_SWITCHED, payload: null });
  dispatch<USER_SWITCHED_COMM>({ type: CommentsTypes.USER_SWITCHED, payload: null });

  dispatch<SELECT_USER>({
    type: UsersTypes.SELECT_USER,
    payload: user,
  });
};

export const renameUser = (values: { firstName: string; lastName: string }): AppThunk => async (dispatch, getState) => {
  try {
    const body: { first_name?: string; last_name?: string } = {};

    const userId = getState().users.selectedUser?.id;

    if (values.firstName !== "") {
      body.first_name = values.firstName;
    }
    if (values.lastName !== "") {
      body.last_name = values.lastName;
    }
    const res = await apiClient.patch(`https://gorest.co.in/public-api/users/${userId}`, body);

    dispatch({ type: UsersTypes.RENAME_USER, payload: res.data.result });
  } catch (error) {
    console.log(error);
  }
};
