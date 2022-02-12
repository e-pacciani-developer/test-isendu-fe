import axios from 'axios';
import { GetAppointmentsDTO } from '../../models/appointment';

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
