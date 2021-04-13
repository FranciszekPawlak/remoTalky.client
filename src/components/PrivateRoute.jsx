import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "./Spinner";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  useAuth();

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Spinner></Spinner>;
};
