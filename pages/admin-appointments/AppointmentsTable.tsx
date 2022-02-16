import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AppointmentWithUser } from '../../models/appointment';
import { formatDates } from '../appointments/appointments.helpers';

interface AppointmentsTableProps {
  editAppointment: (appointment: AppointmentWithUser) => void;
  confirmAppointmentDelete: (appointment: AppointmentWithUser) => void;
  appointments: AppointmentWithUser[];
}

const AppointmentsTable: React.VFC<AppointmentsTableProps> = ({
  appointments,
  editAppointment,
  confirmAppointmentDelete,
}) => {
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
