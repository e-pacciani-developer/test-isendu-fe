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

export function formatDates(
  startAt: Date | string,
  endAt: Date | string
): string {
  return `${format(new Date(startAt), 'dd/MM/yyyy HH:mm')} - ${format(
    new Date(endAt),
    'HH:mm'
  )}`;
}
