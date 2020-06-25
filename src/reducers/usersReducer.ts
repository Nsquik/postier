import { UserState } from "../typescript/interfaces";
import { UserActionTypes, UsersTypes } from "../actions/usersActionTypes";

const initialState: UserState = {
  users: [],
  selectedUser: null,
  error: null,
  isFetching: false,
  lastMeta: null,
};

export const usersReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case UsersTypes.FETCH_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload.users],
        isFetching: false,
        lastMeta: action.payload._meta,
        error: null,
      };
    case UsersTypes.FETCH_USERS_FAILURE:
      return { ...state, error: action.payload, isFetching: false };
    case UsersTypes.FETCH_USERS_REQUEST:
      return { ...state, isFetching: true };
    case UsersTypes.SELECT_USER: {
      return { ...state, selectedUser: action.payload };
    }
    default:
      return state;
  }
};
