import { UserState } from "../typescript/interfaces";
import { UserActionTypes, UsersTypes } from "../actions/usersActionTypes";

const initialState: UserState = {
  users: [],
  selectedUser: {},
  error: null,
  isFetching: false,
  lastMeta: null,
};

export const usersReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};
