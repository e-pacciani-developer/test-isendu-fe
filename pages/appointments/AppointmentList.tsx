import { Box, Container, Flex, List, Spacer, Text } from '@chakra-ui/react';
import { Appointment } from '../../models/appointment';
import AppointmentItem from './AppointmentItem';

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.VFC<AppointmentsListProps> = ({
  appointments,
}) => {
  return (
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
        <List marginTop={'1rem'}>
          {appointments.map(appointment => (
            <AppointmentItem key={appointment.id} appointment={appointment} />
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default AppointmentsList;
