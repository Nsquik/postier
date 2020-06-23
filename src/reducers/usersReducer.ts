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
    case UsersTypes.FETCH_USERS:
      console.log(action.payload);

      return state;
    case UsersTypes.FETCH_USERS_FAILURE:
      return state;
    case UsersTypes.FETCH_USERS_REQUEST:
      return state;
    default:
      return state;
  }
};
