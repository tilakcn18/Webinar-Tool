
import { createStore } from "redux";
import webinarReducer from "./reducers/webinarReducer";

const store = createStore(webinarReducer);

export default store;
