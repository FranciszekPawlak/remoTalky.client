import React, { useContext } from "react";

import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { VideoCallContext } from "../context/VideoCallContext";
import CallEndIcon from "@material-ui/icons/CallEnd";
import CallIcon from "@material-ui/icons/Call";

export const IncommingCall = () => {
  const history = useHistory();
  const { incommingCall, setIncommingCall } = useContext(VideoCallContext);
  return (
    <Dialog
      open={incommingCall !== null}
      onClose={() => setIncommingCall(null)}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        Incomming call from group {incommingCall?.name}
      </DialogTitle>
      <DialogActions>
        <Button
          target="_blank"
          href={`/VideoCall/${incommingCall?._id}`}
          color="primary"
        >
          <CallIcon />
        </Button>
        <Button color="primary" onClick={() => setIncommingCall(null)}>
          <CallEndIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
