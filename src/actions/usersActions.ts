import { AppThunk } from "../typescript/types";
import { FETCH_USERS, UsersTypes, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST } from "./usersActionTypes";
import apiClient from "../api/axios";

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch<FETCH_USERS_REQUEST>({ type: UsersTypes.FETCH_USERS_REQUEST, payload: true });

    const currPage = getState().users.lastMeta?.currentPage;
    const pageToFetch = currPage ? currPage + 1 : 0;
    const { data } = await apiClient.get(`https://gorest.co.in/public-api/users?page=${pageToFetch}`);
    dispatch<FETCH_USERS>({ type: UsersTypes.FETCH_USERS, payload: { _meta: data._meta, users: [data.result] } });
  } catch (err) {
    dispatch<FETCH_USERS_FAILURE>({ type: UsersTypes.FETCH_USERS_FAILURE, payload: err });
  }
};
