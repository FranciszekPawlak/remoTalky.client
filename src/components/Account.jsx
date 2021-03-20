import React, { useContext, useState } from "react";
import { Layout } from "./Layout";
import { useHistory } from "react-router-dom";
import { Context } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField, Select, MenuItem } from "@material-ui/core";
import { apiCall } from "../helpers/apiCall";

import "../style/account.css";

export const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const history = useHistory();
  const { setTheme, theme, url, user } = useContext(Context);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const res = await apiCall(`${url}/register`, "POST", {
        email,
        username,
        password,
        role,
      });

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="account">
        <h1>Welcome, {user?.username}</h1>
        <form onSubmit={addUser}>
          <TextField
            label="username"
            type="text"
            color="primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="email"
            type="email"
            color="primary"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value={0} selected={true}>
              User
            </MenuItem>
            <MenuItem value={1}>Menager</MenuItem>
            <MenuItem value={2}>Admin</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            value="add user"
          >
            ADD USER
          </Button>
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          THEME <FontAwesomeIcon icon={faAdjust} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/logout")}
        >
          LOGOUT <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>
      </div>
    </Layout>
  );
};
