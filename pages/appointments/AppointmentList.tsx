import { Box, Button, Flex, List, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Appointment } from '../../models/appointment';
import AddAppointmentModal from './AddAppointmentModal';
import AppointmentItem from './AppointmentItem';

interface AppointmentsListProps {
  _appointments: Appointment[];
  userId: string;
}

const AppointmentsList: React.VFC<AppointmentsListProps> = ({
  _appointments,
  userId,
}) => {
  const [appointments, setAppointments] = useState(_appointments);

  const addNewAppointmentToList = (appointment: Appointment) => {
    setAppointments(
      [...appointments, appointment].sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      )
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        width={['100%', '70%', '30rem']}
        borderWidth="1px"
        borderRadius="lg"
        padding={'2rem'}
        bg="white"
      >
        <Flex flexDirection="column">
          <Text fontSize={'3xl'}>My Appointments</Text>
          <hr />
          <Button
            onClick={onOpen}
            w="100%"
            colorScheme="facebook"
            size="lg"
            mt={'0.5rem'}
          >
            Add Appointment
          </Button>
          <List marginTop={'1rem'}>
            {appointments.map(appointment => (
              <AppointmentItem key={appointment.id} appointment={appointment} />
            ))}
          </List>
        </Flex>
      </Box>
      <AddAppointmentModal
        isOpen={isOpen}
        onClose={onClose}
        addNewAppointmentToList={addNewAppointmentToList}
        userId={userId}
      />
    </>
  );
};

export default AppointmentsList;
