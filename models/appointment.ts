export interface Appointment {
  id: string;
  startAt: Date;
  endAt: Date;
  userId: string;
  description: string;
}

export interface GetAppointmentsDTO {
  data: Appointment[];
  hasMore: boolean;
}
