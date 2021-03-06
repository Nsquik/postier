import { applyMiddleware, createStore, Store } from "redux";
import reduxThunk from "redux-thunk";
import IStore from "./IStore";

// DEV!
import { composeWithDevTools } from "redux-devtools-extension";
//

import { reducers } from "../reducers/combineReducers";

export default (): Store<IStore> => createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));
