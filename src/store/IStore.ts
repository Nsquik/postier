import { User, Meta } from "../typescript/interfaces";
import { UserState } from "../typescript/interfaces";

export default interface IStore {
  users: UserState;
}
