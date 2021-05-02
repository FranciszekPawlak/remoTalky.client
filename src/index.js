import React from "react";
import ReactDOM from "react-dom";
import "style/index.css";
import { App } from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { VideoCallContextProvider } from "./context/VideoCallContext";
import { BrowserRouter as Router, BrowserHistory } from "react-router-dom";

ReactDOM.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <VideoCallContextProvider>
      <Router>
        <App />
      </Router>
    </VideoCallContextProvider>
  </AuthContextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
