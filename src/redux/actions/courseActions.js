import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
/*
export function createCourse(course) {
  return { type: "CREATE_COURSE", course: course };
}
*/
//It is not preferred to use the hardcoded string. Hence, we can create a file of constants called ActionTypes

/*
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}
//this pat is now done by createCouseSuccess 
*/

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses }; //obj shorthand syntax
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course }; //obj shorthand syntax
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course }; //obj shorthand syntax
}

//thunk
export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      }) //return happens, this is the actual action
      .catch((error) => {
        throw error;
        //loadCoursesError() if you want
      });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      }) //return happens, this is the actual action
      .catch((error) => {
        throw error;
      });
  };
}
