import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
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
import { apiCall } from "../../helpers/apiCall";
import { ConversationsListContext } from "../../context/ConversationsListContext";

export const CreateDialog = () => {
  const { url } = useContext(AuthContext);
  const {
    open,
    setOpen,

    setConversationMobile,
    setConversationDesktop,
  } = useContext(ConversationContext);
  const { setConversationsList, conversationsList } = useContext(
    ConversationsListContext
  );

  const [users, setUsers] = useState(null);
  const [name, setName] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const createConversation = async () => {
    const userIds = users?.map((user) => user.id);
    if (!userIds) {
      alert("empty fields");
      return;
    }
    const { data } = await apiCall(`${url}/conversation/create`, "POST", {
      users: userIds,
      name,
    });
    if (data) {
      setConversationsList([
        { conversation: data, notSeenMessages: 0 },
        ...conversationsList,
      ]);
      setConversationDesktop(data);
      setConversationMobile(data);
      setOpen(false);
    }
  };
  const getAllUsers = async () => {
    try {
      const res = await apiCall(`${url}/users`, "GET");
      setAllUsers(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getAllUsers();
    return setUsers([]);
  }, [,]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle id="form-dialog-title">Create Conversation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select conversation users. For group conversation create her name
        </DialogContentText>
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
            name="conversation name"
            label="conversation name"
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
        <Button onClick={createConversation} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
