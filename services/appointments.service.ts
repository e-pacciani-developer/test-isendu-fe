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

/**
 *  Makes a call to the API for retriving the appoitnment list for the current user, it's used in the user profile page
 * @param page Page pagination param
 * @param limit Limit pagination param
 * @param userId The user id to filter the appointments by, if the user is an admin it will return all the appointments
 * @param role The role to filter the appointments by
 * @returns A GetAppointmentsDTO object containing the appointments list and the hasMore flag to implement pagination
 */
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

/**
 *  Makes a call to the API for retriving the appointments for the calendar, used by admin, filtered by dates
 * @param from Starting date filter
 * @param to End date filter
 * @returns A list of appointments containing the user associated
 */
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

/**
 *  Makes a call to the API for creating an appointment
 * @param appointment The appointment to create
 * @returns The appointment created if the call was successful, an error otherwise
 */
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

/**
 *  Makes a call to the API for updating an appointment
 * @param appointment The appointment to update
 * @returns The updated appointment if the call was successful, an error otherwise
 */
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

/**
 * Makes a call to the API for deleting an appointment
 * @param appointmentId The appointment id to delete
 * @returns True if the appointment was deleted, an error otherwise
 */
async function deleteAppointment(appointmentId: string): Promise<boolean> {
  const response = await axios.delete(
    `http://localhost:5000/api/appointments/${appointmentId}`
  );

  const data = await response.data;

  return data;
}
