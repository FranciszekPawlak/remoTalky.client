import React, { useContext } from "react";
import { Button, DialogTitle, DialogActions, Dialog } from "@material-ui/core";
import { VideoCallContext } from "../context/VideoCallContext";
import CallEndIcon from "@material-ui/icons/CallEnd";
import CallIcon from "@material-ui/icons/Call";

export const IncommingCall = () => {
  const { incommingCall, setIncommingCall } = useContext(VideoCallContext);
  return (
    <Dialog
      open={!!incommingCall}
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
          onClick={() =>
            setTimeout(() => {
              setIncommingCall(null);
            }, 1000)
          }
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
