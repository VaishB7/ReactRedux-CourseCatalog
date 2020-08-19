import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
/*
export function createCourse(course) {
  return { type: "CREATE_COURSE", course: course };
}
*/
//It is not preferred to use the hardcoded string. Hence, we can create a file of constants called ActionTypes

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors }; //obj shorthand syntax
}

//thunk
export function loadAuthors() {
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      }) //return happens, this is the actual action
      .catch((error) => {
        throw error;
        //loadCoursesError() if you want
      });
  };
}
