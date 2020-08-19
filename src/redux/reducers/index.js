import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
//naming impact

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  //eg. key:Value, does for all reducers, no more code req here
});

export default rootReducer;
