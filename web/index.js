import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import App from "./containers/App";
import rootReducer from "./reducer";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
