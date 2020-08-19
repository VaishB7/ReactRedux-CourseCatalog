// We will only have one of this type of file
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index.js";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
//Middleware is just to Enhance redux, it should not go into development.

export default function configureStore(initialState) {
  //for having thats show in redux dev tools:
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // this will add support for the redux dev tools.

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );

  //This middleware will warn us if we accidently mutate ant state in the redux store.
}

/*Originally :  For devlopment, only this part
 
import { createStore } from "redux";
import rootReducer from "./reducers/index.js";

//Middleware is just to Enhance redux, it should not go into development.


export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
*/
