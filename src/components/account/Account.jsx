import React, { useContext, useState } from "react";
import { Layout } from "components/Layout";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Box,
  Switch,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { CreateAccount } from "components/account/CreateAccount";
import { ResetPassword } from "components/account/ResetPassword";

const Account = () => {
  const history = useHistory();
  const { setTheme, theme, user } = useContext(AuthContext);

  const formPadding = 4;
  const formTitlePadding = 2;

  return (
    <Layout>
      <Box
        className="account"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box p={formTitlePadding}>
          <Typography variant="h3" component="h1">
            Welcome, {user?.username}
          </Typography>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="start"
          width="100%"
        >
          {parseInt(user?.role) !== 0 ? null : (
            <Box
              p={formPadding}
              display="flex"
              width="50%"
              justifyContent="center"
            >
              <CreateAccount></CreateAccount>
            </Box>
          )}

          <Box
            p={formPadding}
            display="flex"
            width="50%"
            justifyContent="center"
          >
            <ResetPassword></ResetPassword>
          </Box>
        </Box>
        <Box m={4}>
          <FormControlLabel
            control={
              <Switch
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                checked={theme === "light" ? false : true}
              />
            }
            label="Dark theme"
          />
        </Box>
        <Box m={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/logout")}
          >
            LOGOUT
            <Box ml={2}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Box>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
export default Account;
