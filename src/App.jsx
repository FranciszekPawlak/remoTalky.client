import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Chat } from "./components/Chat";
import { Call } from "./components/Call";
import { Calendar } from "./components/Calendar";
import { Files } from "./components/Files";
import { Account } from "./components/Account";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Context } from "./components/Context";
import { createTheme } from "./style/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PrivateRoute } from "./components/PrivateRoute";
import "./App.css";

export const App = () => {
  const context = useContext(Context);
  const { theme } = context;
  const currentTheme = createTheme(theme);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/call" component={Call} />
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
