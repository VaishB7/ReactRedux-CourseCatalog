import * as types from "../actions/actionTypes";
import initialState from "./initialState";


//below...(state=initialState.courses) OR 
export default function authorReducer(state = initialState().authors, action) {
  //this is where the state is initialized.
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
