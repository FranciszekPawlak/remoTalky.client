import { CalendarWrapper } from "components/calendar/CalendarWrapper";
import { CalendarContextProvider } from "context/CalendarContext";

const Calendar = () => {
  return (
    <CalendarContextProvider>
      <CalendarWrapper />
    </CalendarContextProvider>
  );
};

export default Calendar;
