import React, { createContext, useState, useEffect, useContext } from "react";
import { swrCall } from "../helpers/apiCall";
import useSWR from "swr";
import { apiCall } from "helpers/apiCall";
import { AuthContext } from "context/AuthContext";
export const CalendarContext = createContext();

export const CalendarContextProvider = ({ children }) => {
  const API_URL = "http://localhost:4000";
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data } = useSWR(`${API_URL}/event/list`, swrCall, {
    onSuccess: (e) => setEvents(e),
    refreshInterval: 10000,
  });

  const getUsers = async () => {
    try {
      const res = await apiCall(`${API_URL}/users`, "GET");
      if (res.data) {
        setUsersList(res.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const getGroups = async () => {
    try {
      const res = await apiCall(`${API_URL}/group/getList`, "GET");
      if (res.data) {
        setGroups(res.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getUsers();
    getGroups();
    return () => {
      setUsersList([]);
      setGroups([]);
    };
  }, [,]);

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        editOpen,
        setEditOpen,
        createOpen,
        setCreateOpen,
        detailsOpen,
        setDetailsOpen,
        usersList,
        groups,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
