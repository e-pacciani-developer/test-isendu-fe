import { format, isBefore, isThisMonth, isThisWeek, isToday } from 'date-fns';
import { toast } from 'react-toastify';
import { Appointment } from '../../models/appointment';
import { AddAppointmentFormFields } from './AddAppointmentModal';

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

export function formIsValid(startAt: Date, endAt: Date): boolean {
  if (isBefore(new Date(startAt), new Date())) {
    toast.warn('Date must be in the future');
    return false;
  }

  if (isBefore(new Date(endAt), new Date(startAt))) {
    toast.warn('End date must be after start date');
    return false;
  }

  return true;
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

export function getPeriodTitle(key: string): string {
  switch (key) {
    case 'today':
      return 'Today';
    case 'thisWeek':
      return 'This Week';
    case 'thisMonth':
      return 'This Month';
    case 'next':
      return 'Next Months';
    default:
      return '';
  }
}

function getPeriod(appointment: Appointment): string {
  const appointmentDate = new Date(appointment.startAt);

  if (isToday(appointmentDate)) {
    return 'today';
  }

  if (isThisWeek(appointmentDate, { weekStartsOn: 1 })) {
    return 'thisWeek';
  }

  if (isThisMonth(appointmentDate)) {
    return 'thisMonth';
  }

  return 'next';
}
