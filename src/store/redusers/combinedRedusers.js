import { combineReducers } from "redux";
import todosReduser from "./todos";

const redusers = combineReducers({ todos: todosReduser });
export default redusers;
