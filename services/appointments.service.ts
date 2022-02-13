import axios from 'axios';
import {
  GetAppointmentsDTO,
  CreateAppointmentDTO,
  Appointment,
} from '../models/appointment';

export const appointmentsService = {
  getUserAppointments,
  createAppointment,
  deleteAppointment,
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

async function deleteAppointment(appointment: Appointment): Promise<boolean> {
  const response = await axios.delete(
    `http://localhost:5000/api/appointments/${appointment.id}`
  );

  const data = await response.data;

  return data;
}
