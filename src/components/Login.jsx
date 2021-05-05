import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { AuthContext } from "../context/AuthContext";
import * as Cookies from "js-cookie";
import { authCall } from "../helpers/apiCall";
import Alert from "@material-ui/lab/Alert";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../style/login.css";

export const Login = () => {
  const { handleSubmit, errors, control } = useForm({
    mode: "all",
    shouldUnregister: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const { url, setUser } = useContext(AuthContext);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    if (!email || !password) {
      return setMessage("Incorrect email or password");
    }
    try {
      const res = await authCall(`/login`, "POST", { email, password });

      const { status, data } = res;
      if (status === 200 && data.username && data.role) {
        setUser(data);
        Cookies.set("user", JSON.stringify(data), { expires: 14 });
        Cookies.set("token", data.token, { expires: 14 });
        history.push("/");
      }
    } catch (err) {
      err?.response?.data?.error
        ? setMessage(err?.response?.data?.error)
        : setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <Typography className="icon" variant="h2" component="span">
        <FontAwesomeIcon icon={faLock} />
      </Typography>
      <Typography className="title" variant="h3" component="h1">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          className="email"
          name="email"
          label="email"
          type="email"
          variant="outlined"
          autoComplete="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          control={control}
          error={!!errors.email}
          helperText={errors.email?.message}
          rules={{
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address",
            },
          }}
        />

        <Controller
          as={TextField}
          className="password"
          name="password"
          label="password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          control={control}
          error={!!errors.password}
          helperText={errors.password?.message}
          rules={{
            required: "Required",
          }}
        />

        {message ? (
          <Alert className="alert" severity="success" color="error">
            {message}
          </Alert>
        ) : null}

        <Button variant="contained" color="primary" type="submit" value="login">
          Login {loading ? "..." : null}
        </Button>
      </form>
    </div>
  );
};
