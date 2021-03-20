import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { Context } from "./Context";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "./Spinner";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(Context);
  useAuth();

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Spinner></Spinner>;
};
