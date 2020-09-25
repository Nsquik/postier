import { UserState } from "../typescript/interfaces";
import { UserActionTypes, UsersTypes } from "../actions/usersActionTypes";

export const initialState: UserState = {
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
    case UsersTypes.RENAME_USER: {
      if (state.selectedUser) {
        return {
          ...state,
          selectedUser: action.payload,
          users: state.users.map((user) =>
            user.id === action.payload.id ? { ...user, name: action.payload.name } : user
          ),
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
