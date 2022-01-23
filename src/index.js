import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorBoundry from "./components/error-boundry/error-boundry";
import store from "./store/store";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <Router>
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
