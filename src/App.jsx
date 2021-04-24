import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Calendar } from "./components/Calendar";
import { Files } from "./components/Files";
import { Account } from "./components/Account";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { AuthContext } from "./context/AuthContext";
import { createTheme } from "./style/theme";
import { Groups } from "./components/groups";
import { ThemeProvider } from "@material-ui/core/styles";
import { VideoCall } from "./components/groups/VideoCall";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PrivateRoute } from "./components/PrivateRoute";
import { VideoCallContext } from "./context/VideoCallContext";
import { IncommingCall } from "./components/IncommingCall";
import "./App.css";

export const App = () => {
  const context = useContext(AuthContext);
  const { theme } = context;
  const currentTheme = createTheme(theme);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div className="App">
        <IncommingCall />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/groups" component={Groups} />
          <PrivateRoute path="/videoCall/:id" component={VideoCall} />
          <PrivateRoute path="/calendar" component={Calendar} />
          <PrivateRoute path="/files" component={Files} />
          <PrivateRoute path="/account" component={Account} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </ThemeProvider>
  );
};
