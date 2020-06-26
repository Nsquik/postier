import { UserState, PostState, CommentState } from "../typescript/interfaces";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export default interface IStore {
  users: UserState;
  posts: PostState;
  comments: CommentState;
}

export const useTypedSelector: TypedUseSelectorHook<IStore> = useSelector;
