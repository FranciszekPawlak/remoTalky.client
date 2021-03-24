import React, { useContext, useState } from "react";
import { apiCall } from "../helpers/apiCall";
import { Context } from "./Context";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useForm, Controller } from "react-hook-form";

export const CreateAccount = () => {
  const { handleSubmit, errors, control } = useForm({
    mode: "all",
    shouldUnregister: false,
  });
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2);
  const { url } = useContext(Context);

  const formElementPadding = 1;
  const formTitlePadding = 2;

  const addUser = async (e) => {
    e.preventDefault();
    console.log({
      email,
      username,
      password,
      role,
    });
    try {
      const res = await apiCall(`${url}/register`, "POST", {
        email,
        username,
        password,
        role,
      });

      setMessage({ status: "success", text: res.data });
      setUsername("");
      setEmail("");
      setPassword("");
      setRole(2);
    } catch (err) {
      console.log(err.response.data);
      setMessage({ status: "error", text: err.response.data.error });
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(addUser)} style={{ width: "100%" }}>
      <Box py={formTitlePadding}>
        <Typography variant="h5" component="h2">
          Create new account
        </Typography>
      </Box>
      <Box py={formElementPadding}>
        <Controller
          as={TextField}
          name="username"
          label="username"
          type="text"
          variant="outlined"
          defaultValue={username}
          fullWidth={true}
          onChange={(e) => setUsername(e.target.value)}
          control={control}
          error={!!errors.username}
          helperText={errors.username?.message}
          rules={{
            required: "Required",
          }}
        />
      </Box>
      <Box py={formElementPadding}>
        <Controller
          as={TextField}
          name="email"
          label="email"
          type="email"
          variant="outlined"
          autoComplete="email"
          defaultValue={email}
          fullWidth={true}
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
      </Box>
      <Box py={formElementPadding}>
        <Controller
          as={TextField}
          className="password"
          name="password"
          label="password"
          type="password"
          variant="outlined"
          defaultValue={password}
          fullWidth={true}
          onChange={(e) => setPassword(e.target.value)}
          control={control}
          error={!!errors.password}
          helperText={errors.password?.message}
          rules={{
            required: "Required",
          }}
        />
      </Box>
      <Box py={formElementPadding}>
        <FormControl fullWidth={true} variant="outlined">
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            variant="outlined"
            label="role"
            inputProps={{
              name: "role",
              id: "role",
            }}
          >
            <MenuItem value={2} selected={true}>
              User
            </MenuItem>
            <MenuItem value={1}>Menager</MenuItem>
            <MenuItem value={0}>Admin</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {message ? (
        <Box py={formElementPadding}>
          <Alert className="alert" severity={message.status}>
            {message.text}
          </Alert>
        </Box>
      ) : null}
      <Box py={formElementPadding}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="add user"
          fullWidth={true}
        >
          ADD account
        </Button>
      </Box>
    </form>
  );
};
