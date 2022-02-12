import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Appointment } from '../../models/appointment';
import { formatDates } from './appointments.helpers';

interface AppointmentItemProps {
  appointment: Appointment;
}

const AppointmentItem: React.VFC<AppointmentItemProps> = ({ appointment }) => {
  return (
    <Box
      borderRadius="lg"
      bg="gray.100"
      w="100%"
      p={3}
      color="gray.900"
      margin={'0.5rem 0'}
      borderWidth="1px"
      borderColor={'gray.200'}
      shadow="md"
    >
      <div>
        <Flex marginBottom={'0.5rem'} alignItems={'center'} gap={'0.5rem'}>
          <CalendarIcon /> {formatDates(appointment.startAt, appointment.endAt)}
        </Flex>
        <Text fontSize={'xl'}>{appointment.type}</Text>
        <Text fontSize={'sm'}>{appointment.notes}</Text>
      </div>
      <Flex justifyContent="flex-end">
        <Button colorScheme={'red'} size="xs">
          Cancella
        </Button>
      </Flex>
    </Box>
  );
};

export default AppointmentItem;
