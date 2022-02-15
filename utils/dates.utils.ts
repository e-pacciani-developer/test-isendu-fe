import { Appointment } from './../models/appointment';
export const sortAppointmentsByStartTime = (a: Appointment, b: Appointment) =>
  new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
