import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import ConfirmModal from '../../components/ConfirmModal';
import { Appointment } from '../../models/appointment';
import { formatDates } from './appointments.helpers';

interface AppointmentItemProps {
  appointment: Appointment;
  cancelAppointment: (appointment: Appointment) => void;
}

const AppointmentItem: React.VFC<AppointmentItemProps> = ({
  appointment,
  cancelAppointment,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancel = () => {
    onOpen();
  };

  return (
    <>
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
            <CalendarIcon />{' '}
            {formatDates(appointment.startAt, appointment.endAt)}
          </Flex>
          <Text fontSize={'xl'}>{appointment.type}</Text>
          <Text fontSize={'sm'}>{appointment.notes}</Text>
        </div>
        <Flex justifyContent="flex-end">
          <Button colorScheme={'red'} size="xs" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </Flex>
      </Box>
      <ConfirmModal
        message="Do you want to delete this appointment?"
        isOpen={isOpen}
        onClose={onClose}
        confirmFn={() => cancelAppointment(appointment)}
      />
    </>
  );
};

export default AppointmentItem;
