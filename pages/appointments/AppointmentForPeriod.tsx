import { Text } from '@chakra-ui/react';
import { Appointment } from '../../models/appointment';
import AppointmentItem from './AppointmentItem';

interface AppointmentsForPeriodProps {
  periodTitle: string;
  appointments: Appointment[];
  cancelAppointment: (appointment: Appointment) => void;
}

const AppointmentsForPeriod: React.VFC<AppointmentsForPeriodProps> = ({
  appointments,
  periodTitle,
  cancelAppointment,
}) => {
  return (
    <>
      <Text fontSize={'xl'} fontStyle="italic" textDecoration={'underline'}>
        {periodTitle}
      </Text>
      {appointments.map(appointment => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          cancelAppointment={cancelAppointment}
        />
      ))}
    </>
  );
};

export default AppointmentsForPeriod;
