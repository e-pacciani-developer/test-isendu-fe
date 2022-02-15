import axios from 'axios';
import {
  GetAppointmentsDTO,
  CreateAppointmentDTO,
  Appointment,
  AppointmentWithUser,
} from '../models/appointment';

export const appointmentsService = {
  getUserAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsForCalendar,
};

async function getUserAppointments(
  page: number,
  limit: number,
  userId: string,
  role: string = 'USER'
): Promise<GetAppointmentsDTO> {
  const response = await axios.get<GetAppointmentsDTO>(
    `http://localhost:5000/api/appointments?page=${page}&limit=${limit}&role=${role}&userId=${userId}`
  );
  const appointments = await response.data;

  return appointments;
}

async function getAppointmentsForCalendar(
  from: Date,
  to: Date
): Promise<AppointmentWithUser[]> {
  const response = await axios.get<AppointmentWithUser[]>(
    `http://localhost:5000/api/appointments/calendar?from=${from.toISOString()}&to=${to.toISOString()}`
  );

  const appointments = await response.data;

  return appointments;
}

async function createAppointment(
  appointment: CreateAppointmentDTO
): Promise<Appointment> {
  const response = await axios.post<Appointment>(
    `http://localhost:5000/api/appointments/${appointment.userId}`,
    appointment
  );

  const newAppointment = await response.data;

  return newAppointment;
}

async function updateAppointment(
  appointment: Appointment
): Promise<Appointment> {
  const response = await axios.put<Appointment>(
    `http://localhost:5000/api/appointments/${appointment.id}`,
    appointment
  );

  const updatedAppointment = await response.data;

  return updatedAppointment;
}

async function deleteAppointment(appointmentId: string): Promise<boolean> {
  const response = await axios.delete(
    `http://localhost:5000/api/appointments/${appointmentId}`
  );

  const data = await response.data;

  return data;
}
