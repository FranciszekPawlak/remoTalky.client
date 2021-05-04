import React, { useContext, useState } from "react";
import { authCall } from "helpers/apiCall";
import { AuthContext } from "context/AuthContext";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";

export const ResetPassword = () => {
  const { handleSubmit, errors, register } = useForm({
    mode: "all",
    shouldUnregister: false,
  });
  const { url } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const formElementPadding = 1;
  const formTitlePadding = 2;

  const resetPassword = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    try {
      const res = await authCall(`${url}/resetPassword`, "POST", {
        oldPassword,
        newPassword,
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
    <form onSubmit={handleSubmit(resetPassword)} style={{ width: "100%" }}>
      <Box py={formTitlePadding}>
        <Typography variant="h5" component="h2">
          Reset password
        </Typography>
      </Box>
      <Box py={formElementPadding}>
        <TextField
          name="oldPassword"
          label="old password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          defaultValue=""
          fullWidth={true}
          inputRef={register({
            required: "Required",
          })}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
        />
      </Box>
      <Box py={formElementPadding}>
        <TextField
          name="newPassword"
          label="new password"
          type="password"
          variant="outlined"
          defaultValue=""
          fullWidth={true}
          inputRef={register({
            required: "Required",
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
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
          reset password {loading ? "..." : null}
        </Button>
      </Box>
    </form>
  );
};
