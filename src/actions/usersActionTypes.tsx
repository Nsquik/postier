import { Meta, User } from "../typescript/interfaces";

export enum UsersTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
  FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
}

export type UserActionTypes =
  | { type: UsersTypes.FETCH_USERS; payload: { _meta: Meta; users: User[] } }
  | { type: UsersTypes.FETCH_USERS_FAILURE; payload: { _meta: Meta; error: Error } }
  | { type: UsersTypes.FETCH_USERS_REQUEST; payload: true | false };
