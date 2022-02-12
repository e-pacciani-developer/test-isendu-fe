export interface Appointment {
  id: string;
  startAt: Date;
  endAt: Date;
  userId: string;
  notes: string;
  type: string;
}

export type CreateAppointmentDTO = Omit<Appointment, 'id'>;

export interface GetAppointmentsDTO {
  data: Appointment[];
  hasMore: boolean;
}
