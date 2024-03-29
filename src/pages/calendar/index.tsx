import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from "@mui/material";
import { startOfToday } from "date-fns";
import { useEffect } from "react";
import { useCalendar } from "./hooks/useCalendar";

export const Calendar: React.FC = () => {
  const {
    calendarData,
    loadCalendarData,
  } = useCalendar();

  useEffect(() => {
    loadCalendarData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper>
    <Scheduler
      data={calendarData}
    >
      <ViewState
        defaultCurrentDate={startOfToday()}
      />
      <MonthView />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <Appointments />
    </Scheduler>
  </Paper>
  );
}