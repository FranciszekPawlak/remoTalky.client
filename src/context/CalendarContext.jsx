import React, { createContext, useState, useEffect, useContext } from "react";
import { swrCall, callApi } from "helpers/apiCall";
import useSWR from "swr";
import { AuthContext } from "context/AuthContext";
export const CalendarContext = createContext();

export const CalendarContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useSWR(`/event/list`, swrCall, {
    onSuccess: (e) => setEvents(e),
    refreshInterval: 10000,
  });

  const getUsers = () => callApi(`/users`, "GET", setUsersList);
  const getGroups = () => callApi(`/group/getList`, "GET", setGroups);

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
