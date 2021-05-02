import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { MultiSelect } from "components/MultiSelect";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { apiCall } from "helpers/apiCall";
import format from "date-fns/format";
import { add, parseISO } from "date-fns/esm";
import { Select } from "components/Select";
import { Input } from "components/Input";
import "style/calendarForm.css";

const now = format(Date.now(), "yyyy-MM-dd'T'k:mm");
const defaultEvent = {
  title: "",
  start: now,
  end: "",
  description: "",
  groupId: "",
  users: [],
};

export const Event = ({ open, setOpen, selectedEvent, setSelectedEvent }) => {
  const { url, user } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [allGroups, setAllGroups] = useState([]);
  const [isVideoConferenceEvent, setIsVideoConferenceEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // const editMode =
  //   (selectedEvent && user && selectedEvent?.creator === user?.id) ||
  //   (!selectedEvent && user);

  const { handleSubmit, errors, register, control, setValue } = useForm({
    // mode: "all",
    // shouldUnregister: false,
    defaultValues: defaultEvent,
  });

  const getUsers = async () => {
    try {
      const res = await apiCall(`${url}/users`, "GET");
      setAllUsers(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  const getGroups = async () => {
    try {
      const res = await apiCall(`${url}/group/getList`, "GET");
      setAllGroups(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  const getEvent = async (id) => {
    console.log(id, "aasda");
    try {
      const res = await apiCall(`${url}/event/get/${id}`, "GET");
      if (res.data) {
        const { title, description, start, end, users, groupId } = res.data;
        console.log({ title, description, start, end, users, groupId });
        setValue("title", title);
        setValue("description", description);
        setValue("start", format(new Date(start), "yyyy-MM-dd'T'k:mm"));
        setValue("end", end ? format(new Date(end), "yyyy-MM-dd'T'k:mm") : "");
        setValue("users", users ? users : []);
        setValue("groupId", groupId ? groupId : "");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      getEvent(selectedEvent);

      // setValue([
      //   {
      //     title: selectedEvent.title,
      //     // start: format(selectedEvent.start, "yyyy-MM-dd'T'k:mm"),
      //     // end: format(selectedEvent.end, "yyyy-MM-dd'T'k:mm"),
      //     start: format(new Date(selectedEvent.start), "yyyy-MM-dd'T'k:mm"),
      //     end: format(new Date(selectedEvent.end), "yyyy-MM-dd'T'k:mm"),
      //   },
      // ]);
    }
  }, [selectedEvent, user]);

  useEffect(() => {
    getUsers();
    getGroups();
    return setUsers([]);
  }, [,]);

  const addEvent = async ({
    title,
    description,
    start,
    end,
    groupId,
    users,
  }) => {
    console.log({
      title,
      description,
      start,
      end,
      groupId,
      users,
    });
    setLoading(true);
    console.log({
      title,
      description,
      start,
      end,
      groupId,
      users,
    });
    try {
      const res = await apiCall(`${url}/event/create`, "POST", {
        title,
        description,
        start: new Date(start).toISOString(),
        end: end ? new Date(end).toISOString() : null,
        groupId: groupId ? groupId : null,
        users: users ? users.map((item) => item.id) : [],
      });

      // setMessage({ status: "success", text: res.data });
      console.log(res);
    } catch (err) {
      console.log(err.response);
      // err?.response?.data?.error
      //   ? setMessage({ status: "error", text: err.response.data.error })
      //   : setMessage({ status: "error", text: err.message });

      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setSelectedEvent(null);
      }}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(addEvent)}>
          <Input
            name="title"
            control={control}
            type="text"
            label="*Title"
            errors={errors}
            rules={{
              required: "Required",
              minLength: {
                value: 5,
                message: "Min length is 5",
              },
            }}
          />
          <Input
            name="description"
            control={control}
            type="text"
            label="Description"
            errors={errors}
            rules={{
              required: false,
            }}
          />
          <Input
            name="start"
            control={control}
            type="datetime-local"
            label="*Begin date"
            errors={errors}
            rules={{
              required: "Required",
            }}
          />
          <Input
            name="end"
            control={control}
            type="datetime-local"
            label="End date"
            errors={errors}
            rules={{
              required: false,
            }}
            inputLabelProps={{ shrink: true }}
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={isVideoConferenceEvent}
                color="primary"
                onChange={() => {
                  if (isVideoConferenceEvent) {
                    setGroupId(null);
                  } else {
                    setUsers(null);
                  }
                  setIsVideoConferenceEvent((prev) => !prev);
                }}
              />
            }
            label="Video conference event for exsist group"
          /> */}

          <Select
            list={allGroups}
            optionTitle="name"
            label="select group for vide call"
            errors={errors}
            rules={{
              required: false,
            }}
            name="groupId"
            optionValue="_id"
            control={control}
          />
          <MultiSelect
            list={allUsers}
            optionTitle="username"
            label="select event users"
            placeholder="select users"
            handleChange={setUsers}
            errors={errors}
            name="users"
            validatorRef={register({
              required: false,
            })}
            control={control}
            setValue={setValue}
          />
          {message ? (
            <Alert className="alert" severity={message.status}>
              {message.text}
            </Alert>
          ) : null}
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                setSelectedEvent(null);
              }}
              color="primary"
            >
              Close
            </Button>

            <Button type="submit" color="primary">
              Create {loading ? "..." : null}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
