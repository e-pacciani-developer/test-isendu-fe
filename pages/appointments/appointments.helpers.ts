import { Appointment, CreateAppointmentDTO } from './../../models/appointment';
import axios from 'axios';
import { GetAppointmentsDTO } from '../../models/appointment';
import { format } from 'date-fns';

export async function getUserAppointments(
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

export async function createAppointment(
  appointment: CreateAppointmentDTO
): Promise<Appointment | null> {
  const response = await axios.post<Appointment>(
    `http://localhost:5000/api/appointments/${appointment.userId}`,
    appointment
  );

  if (response) {
    const newAppointment = await response.data;
    return newAppointment;
  }

  return null;
}

export async function deleteAppointment(
  appointment: Appointment
): Promise<boolean> {
  const response = await axios.delete(
    `http://localhost:5000/api/appointments/${appointment.id}`
  );

  const data = await response.data;

  return data;
}

export function formatDates(
  startAt: Date | string,
  endAt: Date | string
): string {
  return `${format(new Date(startAt), 'dd/MM/yyyy HH:mm')} - ${format(
    new Date(endAt),
    'HH:mm'
  )}`;
}

export function setCurrentDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function generateStartAndEndDates(
  date: string,
  startTime: string,
  endTime: string
): [Date, Date] {
  const startAt = new Date(`${date} ${startTime}`);
  const endAt = new Date(`${date} ${endTime}`);

  return [startAt, endAt];
}
