import { User, Meta } from "../typescript/interfaces";
import { UserState } from "../typescript/interfaces";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export default interface IStore {
  users: UserState;
}

export const useTypedSelector: TypedUseSelectorHook<IStore> = useSelector;
