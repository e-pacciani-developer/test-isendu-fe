import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { AppointmentWithUser } from '../../models/appointment';
import { appointmentsService } from '../../services/appointments.service';
import { formatDates } from '../appointments/appointments.helpers';

interface AppointmentsTableProps {
  userId: string;
  editAppointment: (appointment: AppointmentWithUser) => void;
  confirmAppointmentDelete: (appointment: AppointmentWithUser) => void;
}

const AppointmentsTable: React.VFC<AppointmentsTableProps> = ({
  userId,
  editAppointment,
  confirmAppointmentDelete,
}) => {
  const [appointments, setAppointments] = useState<AppointmentWithUser[]>([]);

  const getAppointments = useCallback(async () => {
    // TODO implement true pagination
    const appointmentsList = await appointmentsService.getUserAppointments(
      1,
      30,
      userId,
      'ADMIN'
    );
    setAppointments(appointmentsList.data);
  }, [userId]);

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Date / Time</Th>
          <Th>Type</Th>
          <Th>Notes</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {appointments.map(appointment => (
          <Tr key={appointment.id}>
            <Td>{appointment.user.name}</Td>
            <Td>{formatDates(appointment.startAt, appointment.endAt)}</Td>
            <Td>{appointment.type}</Td>
            <Td>{appointment.notes}</Td>
            <Td>
              <Flex gap={'0.5rem'}>
                <IconButton
                  onClick={() => editAppointment(appointment)}
                  size={'sm'}
                  colorScheme="facebook"
                  aria-label="Edit appointment"
                  icon={<EditIcon />}
                />
                <IconButton
                  onClick={() => confirmAppointmentDelete(appointment)}
                  size={'sm'}
                  colorScheme="red"
                  aria-label="Delete appointment"
                  icon={<DeleteIcon />}
                />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AppointmentsTable;
