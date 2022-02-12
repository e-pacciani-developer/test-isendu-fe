export interface Appointment {
  id: string;
  startAt: Date;
  endAt: Date;
  userId: string;
  notes: string;
  type: string;
}

export interface GetAppointmentsDTO {
  data: Appointment[];
  hasMore: boolean;
}
