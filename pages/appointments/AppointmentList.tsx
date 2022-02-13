import { Box, Button, Flex, List, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Appointment } from '../../models/appointment';
import AddAppointmentModal from './AddAppointmentModal';
import { appointmentsService } from '../../services/appointments.service';
import {
  getAppointmentsMapByPeriod,
  getPeriodTitle,
} from './appointments.helpers';
import AppointmentsForPeriod from './AppointmentForPeriod';
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

  const cancelAppointment = async (appointment: Appointment) => {
    try {
      await appointmentsService.deleteAppointment(appointment);
      toast.success('Appointment cancelled successfully');
      setAppointments(appointments.filter(a => a.id !== appointment.id));
    } catch (e) {}
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [appointmentsMap, setAppointmentMap] = useState(
    new Map<string, Appointment[]>()
  );

  useEffect(() => {
    const appointmentsMap = getAppointmentsMapByPeriod(appointments);

    setAppointmentMap(appointmentsMap);
  }, [appointments]);

  return (
    <>
      <Button onClick={onOpen} w="100%" colorScheme="facebook" size="lg">
        Add Appointment
      </Button>
      <Box
        width={['100%', '70%', '30rem']}
        borderWidth="1px"
        borderRadius="lg"
        padding={'1rem 2rem'}
        bg="white"
        overflow={'auto'}
        style={{ marginBottom: '2rem' }}
      >
        <Flex flexDirection="column">
          <Text fontSize={'3xl'}>My Appointments</Text>
          <hr />
          <List marginTop={'1rem'}>
            {Array.from(appointmentsMap.entries()).map(
              ([period, appointments]) => (
                <AppointmentsForPeriod
                  key={period}
                  periodTitle={getPeriodTitle(period)}
                  appointments={appointments}
                  cancelAppointment={cancelAppointment}
                />
              )
            )}
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
