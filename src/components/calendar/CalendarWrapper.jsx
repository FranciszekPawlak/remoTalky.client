import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Layout } from "components/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CreateEvent } from "components/calendar/Create";
import { ShowEvent } from "components/calendar/Show";
import { EditEvent } from "components/calendar/Edit";
import { CalendarContext } from "context/CalendarContext";
import "style/calendar.css";

export const CalendarWrapper = () => {
  const {
    events,
    setCreateOpen,
    setSelectedEvent,
    setDetailsOpen,
  } = useContext(CalendarContext);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 800 });

  const customButton = {
    custom: {
      text: "Add event",
      click: () => setCreateOpen(true),
    },
  };

  const onClickEvent = (e) => {
    setSelectedEvent(e.event.extendedProps._id);
    setDetailsOpen(true);
  };

  return (
    <Layout>
      <div id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          displayEventEnd={true}
          displayEventTime={true}
          eventClick={onClickEvent}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventDisplay={"block"}
          initialView={isDesktopOrLaptop ? "dayGridMonth" : "dayGridDay"}
          height="90vh"
          customButtons={customButton}
          headerToolbar={{
            center: "custom",
            right: "prev,next,today,dayGridDay,dayGridWeek,dayGridMonth",
          }}
          events={events}
        />
      </div>

      <CreateEvent />
      <ShowEvent />
      <EditEvent />
    </Layout>
  );
};
