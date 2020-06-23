import { combineReducers } from "redux";
import IStore from "../store/IStore";
import { usersReducer } from "./usersReducer";

export const reducers = combineReducers<IStore>({
  users: usersReducer,
});
