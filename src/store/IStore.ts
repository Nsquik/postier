import { UserState, PostState } from "../typescript/interfaces";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export default interface IStore {
  users: UserState;
  posts: PostState;
}

export const useTypedSelector: TypedUseSelectorHook<IStore> = useSelector;
