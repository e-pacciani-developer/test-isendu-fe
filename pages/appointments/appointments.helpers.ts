import { format, isThisMonth, isThisWeek, isToday } from 'date-fns';
import { Appointment } from '../../models/appointment';

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

export function getAppointmentsMapByPeriod(
  appointments: Appointment[]
): Map<string, Appointment[]> {
  const appointmentsMapByPeriod = new Map<string, Appointment[]>();

  for (const appointment of appointments) {
    const period = getPeriod(appointment);

    if (appointmentsMapByPeriod.has(period)) {
      appointmentsMapByPeriod.get(period)?.push(appointment);
    } else {
      appointmentsMapByPeriod.set(period, [appointment]);
    }
  }

  return appointmentsMapByPeriod;
}

function getPeriod(appointment: Appointment): string {
  if (isToday(appointment.startAt)) {
    return 'today';
  }

  if (isThisWeek(appointment.startAt)) {
    return 'thisWeek';
  }

  if (isThisMonth(appointment.startAt)) {
    return 'thisMonth';
  }

  return 'Next';
}
