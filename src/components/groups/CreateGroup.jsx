import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { GroupContext } from "context/GroupContext";
import {
  Box,
  Button,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { callApi } from "helpers/apiCall";
import { GroupListContext } from "context/GroupListContext";

export const CreateGroup = () => {
  const { url } = useContext(AuthContext);
  const { open, setOpen, setGroupMobile, setGroupDesktop } = useContext(
    GroupContext
  );
  const { setGroupList, groupList } = useContext(GroupListContext);
  const [users, setUsers] = useState(null);
  const [name, setName] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
    return setUsers([]);
  }, [,]);

  const createGroup = async () => {
    const userIds = users?.map((user) => user.id);
    if (!userIds) {
      return;
    }
    callApi(`${url}/group/create`, "POST", createCallback, {
      users: userIds,
      name,
    });
  };
  const getAllUsers = () => callApi(`${url}/users`, "GET", setAllUsers);

  const createCallback = (data) => {
    setGroupList([{ group: data, notSeenMessages: 0 }, ...groupList]);
    setGroupDesktop(data);
    setGroupMobile(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
      <DialogContent>
        <DialogContentText>Select group users.</DialogContentText>
        <Box py={1}>
          <Autocomplete
            multiple
            options={allUsers}
            getOptionLabel={(option) => option.username}
            filterSelectedOptions
            fullWidth={true}
            onChange={(e, value) => setUsers(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="select users"
                placeholder="select users"
              />
            )}
          />
        </Box>
        <Box py={1}>
          <TextField
            name="group name"
            label="group name"
            type="text"
            variant="outlined"
            defaultValue=""
            fullWidth={true}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={createGroup} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
