import { applyMiddleware, createStore } from "redux";
import redusers from "./redusers/combinedRedusers";
import thunk from "redux-thunk";
const store = createStore(redusers, {}, applyMiddleware(thunk));
export default store;
