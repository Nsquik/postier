import { Meta, User } from "../typescript/interfaces";

export enum UsersTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
  FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
  SELECT_USER = "SELECT_USER",
  RENAME_USER = "RENAME_USER",
}

export type FETCH_USERS = { type: UsersTypes.FETCH_USERS; payload: { _meta: Meta; users: User[] } };
export type FETCH_USERS_FAILURE = { type: UsersTypes.FETCH_USERS_FAILURE; payload: Error };
export type FETCH_USERS_REQUEST = { type: UsersTypes.FETCH_USERS_REQUEST; payload: true | false };
export type SELECT_USER = { type: UsersTypes.SELECT_USER; payload: User };
export type RENAME_USER = { type: UsersTypes.RENAME_USER; payload: User };

export type UserActionTypes = FETCH_USERS | FETCH_USERS_FAILURE | FETCH_USERS_REQUEST | SELECT_USER | RENAME_USER;
