import { AppThunk } from "../typescript/types";
import { FETCH_USERS, UsersTypes, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST } from "./usersActionTypes";
import { apiClient } from "../api/axios";
import { User } from "../typescript/interfaces";

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

export const selectUser = (user: User) => {
  return {
    type: UsersTypes.SELECT_USER,
    payload: user,
  };
};
