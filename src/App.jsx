import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { createTheme } from "./style/theme";
import { Home } from "./components/Home";
import { Calendar } from "./components/calendar";
import { Files } from "./components/Files";
import { Account } from "./components/Account";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { AuthContext } from "./context/AuthContext";
import { Groups } from "./components/groups";
import { VideoCall } from "./components/groups/videoCall/VideoCall";
import { PrivateRoute } from "./components/PrivateRoute";
import { IncommingCall } from "./components/IncommingCall";
import "style/App.css";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="bottom-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ThemeProvider>
  );
};
