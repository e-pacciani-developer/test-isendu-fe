import {
  Box,
  Button,
  Container,
  Flex,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Appointment } from '../../models/appointment';
import AddAppointmentModal from './AddAppointmentModal';
import AppointmentItem from './AppointmentItem';

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.VFC<AppointmentsListProps> = ({
  appointments,
}) => {
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
      <AddAppointmentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AppointmentsList;
