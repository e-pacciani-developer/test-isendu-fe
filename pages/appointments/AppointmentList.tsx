import { Box, Button, Flex, List, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Appointment } from '../../models/appointment';
import AddAppointmentModal from './AddAppointmentModal';
import AppointmentItem from './AppointmentItem';
import { appointmentsService } from '../../services/appointments.service';
import { getAppointmentsMapByPeriod } from './appointments.helpers';
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

  const [appointmentMap, setAppointmentMap] = useState(
    new Map<string, Appointment[]>()
  );

  useEffect(() => {
    const appointmentsMap = getAppointmentsMapByPeriod(appointments);

    setAppointmentMap(appointmentsMap);
  }, [appointments]);

  return (
    <>
      <Box
        width={['100%', '70%', '30rem']}
        borderWidth="1px"
        borderRadius="lg"
        padding={'1rem 2rem'}
        bg="white"
      >
        <Flex flexDirection="column">
          <Text fontSize={'3xl'}>My Appointments</Text>
          <hr />
          <Button
            style={{ marginTop: '2rem' }}
            onClick={onOpen}
            w="100%"
            colorScheme="facebook"
            size="lg"
            mt={'0.5rem'}
          >
            Add Appointment
          </Button>
          <List marginTop={'1rem'}>
            {appointmentMap.has('today') ? (
              <>
                <Text
                  fontSize={'xl'}
                  fontStyle="italic"
                  textDecoration={'underline'}
                >
                  Today
                </Text>
                {appointmentMap.get('today')?.map(appointment => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    cancelAppointment={cancelAppointment}
                  />
                ))}
              </>
            ) : null}

            {appointmentMap.has('thisWeek') ? (
              <>
                <Text
                  fontSize={'xl'}
                  fontStyle="italic"
                  textDecoration={'underline'}
                >
                  This Week
                </Text>
                {appointmentMap.get('thisWeek')?.map(appointment => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    cancelAppointment={cancelAppointment}
                  />
                ))}
              </>
            ) : null}

            {appointmentMap.has('thisMonth') ? (
              <>
                <Text
                  fontSize={'xl'}
                  fontStyle="italic"
                  textDecoration={'underline'}
                >
                  This Month
                </Text>
                {appointmentMap.get('thisMonth')?.map(appointment => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    cancelAppointment={cancelAppointment}
                  />
                ))}
              </>
            ) : null}
            {appointmentMap.has('next') ? (
              <>
                <Text
                  fontSize={'xl'}
                  fontStyle="italic"
                  textDecoration={'underline'}
                >
                  Next Months
                </Text>
                {appointmentMap.get('next')?.map(appointment => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    cancelAppointment={cancelAppointment}
                  />
                ))}
              </>
            ) : null}
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
