import { Action } from "redux";
import { reducers } from "../reducers/combineReducers";
import { ThunkAction } from "redux-thunk";

export type RootState = ReturnType<typeof reducers>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
