import { combineReducers } from "redux";
import IStore from "../store/IStore";
import { usersReducer } from "./usersReducer";
import { postsReducer } from "./postsReducer";
import { commentsReducer } from "./commentsReducer";

export const reducers = combineReducers<IStore>({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});
