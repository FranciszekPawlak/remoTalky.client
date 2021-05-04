import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { callApi } from "helpers/apiCall";
import { EventInTable } from "components/calendar/EventInTable";
import "style/calendar/calendarForm.css";
import { CalendarContext } from "context/CalendarContext";

export const ShowEvent = () => {
  const {
    setEvents,
    setEditOpen,
    selectedEvent,
    setSelectedEvent,
    detailsOpen,
    setDetailsOpen,
  } = useContext(CalendarContext);
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      getEvent(selectedEvent);
    }
  }, [selectedEvent, detailsOpen]);

  const getEvent = async (id) => callApi(`/event/get/${id}`, "GET", setEvent);

  const deleteEvent = async () => {
    if (!event?._id || user?.id !== event?.creator?._id) {
      return;
    }
    callApi(`/event/delete/${event._id}`, "DELETE", deleteCallback);
  };

  const deleteCallback = () => {
    setEvents((prev) => prev.filter((item) => item._id !== event._id));
    setSelectedEvent(null);
    toast.success("Success");
    setConfirmDialog(false);
    setDetailsOpen(false);
  };

  return (
    <>
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Details Event</DialogTitle>
        <DialogContent>{event && <EventInTable event={event} />}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} color="primary">
            Close
          </Button>
          {user?.id === event?.creator?._id ? (
            <>
              <Button color="primary" onClick={() => setEditOpen(true)}>
                Edit
              </Button>
              <Button color="primary" onClick={() => setConfirmDialog(true)}>
                Delete
              </Button>
            </>
          ) : null}
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        fullWidth
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={deleteEvent}>
            Delete
          </Button>
          <Button color="primary" onClick={() => setConfirmDialog(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
