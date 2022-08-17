import profileReducer from "./profileReducer";
import todoReducer from "./todoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ profileReducer, todoReducer });

export default rootReducer;
