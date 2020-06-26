import { combineReducers } from "redux";
import IStore from "../store/IStore";
import { usersReducer } from "./usersReducer";
import { postsReducer } from "./postsReducer";

export const reducers = combineReducers<IStore>({
  users: usersReducer,
  posts: postsReducer,
});
