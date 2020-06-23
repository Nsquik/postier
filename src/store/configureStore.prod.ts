import { applyMiddleware, createStore, Store } from "redux";
import reduxThunk from "redux-thunk";
import IStore from "./IStore";

import { reducers } from "../reducers/combineReducers";

export default (): Store<IStore> => createStore(reducers, applyMiddleware(reduxThunk));
