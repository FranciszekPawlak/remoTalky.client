import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import * as Cookies from "js-cookie";
import { authCall } from "../helpers/apiCall";
import "../style/logout.css";

export const Logout = () => {
  const history = useHistory();
  const { url, setUser } = useContext(AuthContext);

  const logout = () => {
    authCall(`${url}/logout`, "GET");
    setUser(null);
    Cookies.remove("user");
    history.push("/login");
  };

  useEffect(() => {
    logout();
  }, [,]);

  return (
    <div className="logout">
      <FontAwesomeIcon icon={faHamburger} />
    </div>
  );
};
