import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
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

export const ResetPassword = () => {
  const { handleSubmit, errors, control } = useForm({
    mode: "all",
    shouldUnregister: false,
  });
  const { url } = useContext(Context);
  const [message, setMessage] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const formElementPadding = 1;
  const formTitlePadding = 2;

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await apiCall(`${url}/resetPassword`, "POST", {
        oldPassword,
        newPassword,
      });

      setMessage({ status: "success", text: res.data });
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err.response.data.error);
      setMessage({ status: "error", text: err.response.data.error });
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(resetPassword)} style={{ width: "100%" }}>
      <Box py={formTitlePadding}>
        <Typography variant="h5" component="h2">
          Reset password
        </Typography>
      </Box>
      <Box py={formElementPadding}>
        <Controller
          as={TextField}
          name="oldPassword"
          label="old password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          defaultValue={oldPassword}
          fullWidth={true}
          onChange={(e) => setOldPassword(e.target.value)}
          control={control}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          rules={{
            required: "Required",
          }}
        />
      </Box>
      <Box py={formElementPadding}>
        <Controller
          as={TextField}
          name="newPassword"
          label="new password"
          type="password"
          variant="outlined"
          defaultValue={newPassword}
          fullWidth={true}
          onChange={(e) => setNewPassword(e.target.value)}
          control={control}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          rules={{
            required: "Required",
          }}
        />
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
          fullWidth={true}
        >
          reset password
        </Button>
      </Box>
    </form>
  );
};
