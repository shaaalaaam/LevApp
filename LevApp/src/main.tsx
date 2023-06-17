
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import LoginPage from "./components/loginPage";

ReactDOM.render(
  <Provider store={store}>
    {/* <LoginPage/> */}
    <App />
  </Provider>,
  document.getElementById("root")
);
