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
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";
import { MultiSelect } from "components/MultiSelect";
import { apiCall } from "helpers/apiCall";
import format from "date-fns/format";
import { Select } from "components/Select";
import { Input } from "components/Input";
import "style/calendarForm.css";
import { CalendarContext } from "context/CalendarContext";

const now = format(Date.now(), "yyyy-MM-dd'T'k:mm");
const defaultEvent = {
  title: "",
  start: now,
  end: "",
  description: "",
  groupId: "",
  users: [],
};

export const CreateEvent = () => {
  const {
    setEvents,
    createOpen,
    setCreateOpen,
    groups,
    usersList,
  } = useContext(CalendarContext);
  const { url, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register, control, setValue } = useForm({
    // mode: "all",
    // shouldUnregister: false,
    defaultValues: defaultEvent,
  });

  const addEvent = async ({
    title,
    description,
    start,
    end,
    groupId,
    users,
  }) => {
    setLoading(true);
    try {
      const res = await apiCall(`${url}/event/create`, "POST", {
        title,
        description,
        start: new Date(start).toISOString(),
        end: end ? new Date(end).toISOString() : null,
        group: groupId ? groupId : null,
        users: users ? users.map((item) => item.id) : [],
      });

      if (res.data) {
        setEvents((prev) => [...prev, res.data]);
        setCreateOpen(false);
        toast.success("Success");
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={createOpen}
      onClose={() => {
        setCreateOpen(false);
      }}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(addEvent)}>
          <Input
            name="title"
            control={control}
            type="text"
            label="Title"
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

          <Select
            list={groups}
            optionTitle="name"
            label="select group"
            errors={errors}
            rules={{
              required: false,
            }}
            name="groupId"
            optionValue="_id"
            control={control}
            setValue={setValue}
          />
          <MultiSelect
            list={usersList}
            optionTitle="username"
            label="select users"
            placeholder="select users"
            errors={errors}
            name="users"
            validatorRef={register({
              required: false,
            })}
            control={control}
            setValue={setValue}
          />

          <DialogActions>
            <Button onClick={() => setCreateOpen(false)} color="primary">
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
