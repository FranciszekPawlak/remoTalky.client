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
import { apiCall } from "helpers/apiCall";
import { EventInTable } from "components/calendar/EventInTable";
import "style/calendarForm.css";
import { CalendarContext } from "context/CalendarContext";

export const ShowEvent = () => {
  const { url, user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {
    setEvents,
    setEditOpen,
    selectedEvent,
    setSelectedEvent,
    detailsOpen,
    setDetailsOpen,
  } = useContext(CalendarContext);

  const getEvent = async (id) => {
    try {
      const res = await apiCall(`${url}/event/get/${id}`, "GET");
      if (res.data) {
        setEvent(res.data);
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
  };
  const deleteEvent = async () => {
    if (!event?._id || user?.id !== event?.creator?._id) {
      return;
    }
    try {
      const res = await apiCall(`${url}/event/delete/${event._id}`, "DELETE");
      if (res.data) {
        setEvents((prev) => prev.filter((item) => item._id !== event._id));
        setSelectedEvent(null);
        toast.success("Success");
        setConfirmDialog(false);
        setDetailsOpen(false);
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      getEvent(selectedEvent);
    }
  }, [selectedEvent, detailsOpen]);

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
