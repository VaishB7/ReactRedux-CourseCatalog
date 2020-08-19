import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import "./bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();
/*It can be useful to pass initial state into the store
if you are server rendering or 
initializing your redux store with date from the LocalStorage.
*/

/*Currently our reducer sets the current state, if we pass
the initial state here, it is merelt for overriding the default
parameters we specified in the reducer. */

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
