import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { MultiSelect } from "components/MultiSelect";
import { apiCall } from "helpers/apiCall";
import format from "date-fns/format";
import { add, parseISO } from "date-fns/esm";
import { Select } from "components/Select";
import { Input } from "components/Input";
import { toast } from "react-toastify";
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

export const EditEvent = () => {
  const {
    setEvents,
    editOpen,
    setEditOpen,
    setDetailsOpen,
    selectedEvent,
    setSelectedEvent,
    usersList,
    groups,
  } = useContext(CalendarContext);
  const { url } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register, control, setValue } = useForm({
    defaultValues: defaultEvent,
  });

  const getEvent = async (id) => {
    try {
      const res = await apiCall(`${url}/event/get/${id}`, "GET");
      if (res.data) {
        console.log(res.data);
        const { title, description, start, end, users, group } = res.data;
        setValue("title", title, { shouldDirty: true, shouldValidate: true });
        setValue("description", description);
        setValue("start", format(new Date(start), "yyyy-MM-dd'T'k:mm"));
        setValue("end", end ? format(new Date(end), "yyyy-MM-dd'T'k:mm") : "");
        setValue("users", users ? users : []);
        setValue("groupId", group ? group._id : "");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      getEvent(selectedEvent);
    }
  }, [selectedEvent, editOpen]);

  const editEvent = async (props) => {
    const { title, description, start, end, groupId, users } = props;
    setLoading(true);

    try {
      const res = await apiCall(`${url}/event/edit`, "POST", {
        id: selectedEvent,
        title,
        description,
        start: new Date(start).toISOString(),
        end: end ? new Date(end).toISOString() : null,
        group: groupId ? groupId : null,
        users: users ? users.map((item) => item._id) : [],
      });

      if (res.data) {
        setEvents((prev) =>
          prev.map((item) => {
            if (item._id === res.data._id) {
              item = res.data;
            }
            return item;
          })
        );
        setSelectedEvent(null);
        setEditOpen(false);
        setDetailsOpen(false);
        toast.success("Success");
      }
    } catch (err) {
      toast.error(err?.response?.statusText);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={editOpen}
      onClose={() => {
        setEditOpen(false);
        setSelectedEvent(null);
      }}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Edit Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(editEvent)}>
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
            <Button
              onClick={() => {
                setEditOpen(false);
                setSelectedEvent(null);
              }}
              color="primary"
            >
              Close
            </Button>

            <Button type="submit" color="primary">
              Edit {loading ? "..." : null}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
