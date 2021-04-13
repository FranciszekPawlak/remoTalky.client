import React, { useContext, useState } from "react";
import { apiCall } from "../helpers/apiCall";
import { AuthContext } from "../context/AuthContext";
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
import { useForm } from "react-hook-form";

export const CreateAccount = () => {
  const { handleSubmit, errors, register } = useForm({
    mode: "all",
    shouldUnregister: false,
  });
  const [message, setMessage] = useState(null);
  const { url } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(2);

  const formElementPadding = 1;
  const formTitlePadding = 2;

  const addUser = async ({ email, username, password }) => {
    setLoading(true);
    try {
      const res = await apiCall(`${url}/register`, "POST", {
        email,
        username,
        password,
        role,
      });

      setMessage({ status: "success", text: res.data });
    } catch (err) {
      err?.response?.data?.error
        ? setMessage({ status: "error", text: err.response.data.error })
        : setMessage({ status: "error", text: err.message });

      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(addUser)} style={{ width: "100%" }}>
      <Box py={formTitlePadding}>
        <Typography variant="h5" component="h2">
          Create new account
        </Typography>
      </Box>
      <Box py={formElementPadding}>
        <TextField
          name="username"
          label="username"
          type="text"
          variant="outlined"
          defaultValue=""
          fullWidth={true}
          inputRef={register({
            required: "Required",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </Box>
      <Box py={formElementPadding}>
        <TextField
          name="email"
          label="email"
          type="email"
          variant="outlined"
          autoComplete="email"
          fullWidth={true}
          defaultValue=""
          inputRef={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>
      <Box py={formElementPadding}>
        <TextField
          className="password"
          name="password"
          label="password"
          type="password"
          variant="outlined"
          defaultValue=""
          fullWidth={true}
          inputRef={register({
            required: "Required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>
      <Box py={formElementPadding}>
        <FormControl fullWidth={true} variant="outlined">
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            value={role}
            variant="outlined"
            label="role"
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
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
          create account {loading ? "..." : null}
        </Button>
      </Box>
    </form>
  );
};
