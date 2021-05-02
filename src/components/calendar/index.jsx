import { CalendarWrapper } from "components/calendar/CalendarWrapper";
import { CalendarContextProvider } from "context/CalendarContext";

export const Calendar = () => {
  return (
    <CalendarContextProvider>
      <CalendarWrapper />
    </CalendarContextProvider>
  );
};
