import React, { useContext, Suspense, lazy } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { createTheme } from "./style/theme";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { AuthContext } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { IncommingCall } from "./components/IncommingCall";
import { Spinner } from "components/Spinner";
import "style/App.css";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./components/Home"));
const Calendar = lazy(() => import("./components/calendar"));
const Files = lazy(() => import("./components/files"));
const Account = lazy(() => import("./components/account/Account"));
const Groups = lazy(() => import("./components/groups"));
const VideoCall = lazy(() => import("./components/groups/videoCall/VideoCall"));

export const App = () => {
  const context = useContext(AuthContext);
  const { theme } = context;
  const currentTheme = createTheme(theme);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div className="App">
        <IncommingCall />
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
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
