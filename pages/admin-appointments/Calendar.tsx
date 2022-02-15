import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Calendar,
  dateFnsLocalizer,
  NavigateAction,
  SlotInfo,
  View,
} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { Appointment, AppointmentWithUser } from '../../models/appointment';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarPageProps {
  events: Event[];
  editAppointment: (appointment: AppointmentWithUser) => void;
  getMonthsEvents: (date: Date) => void;
}

interface Event {
  title?: React.ReactNode | undefined;
  start?: Date | undefined;
  end?: Date | undefined;
  resource?: AppointmentWithUser;
}

const CalendarPage: React.VFC<CalendarPageProps> = ({
  events,
  editAppointment,
  getMonthsEvents,
}) => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(event: Event) => editAppointment(event.resource!)}
      style={{ height: 620 }}
      onNavigate={(newDate: Date) => {
        getMonthsEvents(newDate);
      }}
      selectable={true}
    />
  </div>
);

export default CalendarPage;
