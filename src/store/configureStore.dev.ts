import { applyMiddleware, createStore, Store } from "redux";
import reduxThunk from "redux-thunk";
import IStore from "./IStore";
// import initialState from './initialState';

// DEV!

import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "../reducers/combineReducers";

export default () => createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));
