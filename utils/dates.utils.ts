import { Appointment, AppointmentWithUser } from './../models/appointment';
export const sortAppointmentsByStartTime = (a: Appointment, b: Appointment) =>
  new Date(a.startAt).getTime() - new Date(b.startAt).getTime();

export const toCalendarEvent = (appointment: AppointmentWithUser) => {
  return {
    title: appointment.type,
    start: new Date(appointment.startAt),
    end: new Date(appointment.endAt),
    resource: appointment,
  };
};
