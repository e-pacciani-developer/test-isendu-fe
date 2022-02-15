import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';
import Layout from '../../components/Layout';
import { AppointmentWithUser } from '../../models/appointment';
import { appointmentsService } from '../../services/appointments.service';
import { usersService } from '../../services/user.service';
import {
  sortAppointmentsByStartTime,
  toCalendarEvent,
} from '../../utils/dates.utils';
import AppointmentsTable from './AppointmentsTable';
import MyCalendar from './Calendar';
import EditAdminAppointmentModal from './EditAdminAppointmentModal';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.params?.userId as string;

  const user = await usersService.getUserById(userId);

  if (user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const appointments = await appointmentsService.getAppointmentsForCalendar(
    start,
    end
  );

  return {
    props: { appointmentsList: appointments, userId },
  };
};

const AdminAppointmentsList = ({
  appointmentsList,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithUser | null>(null);
  const [appointments, setAppointments] =
    useState<AppointmentWithUser[]>(appointmentsList);
  const [listAppointments, setListAppointments] = useState<
    AppointmentWithUser[]
  >([]);
  const [tabIndex, setTabIndex] = useState(0);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const addAppointment = () => {
    setSelectedAppointment(null);
    onEditOpen();
  };

  const getListAppointments = useCallback(async () => {
    const appointmentsList = await appointmentsService.getUserAppointments(
      1,
      30,
      userId,
      'ADMIN'
    );
    setListAppointments(appointmentsList.data);
  }, [userId]);

  useEffect(() => {
    if (tabIndex === 1) {
      getListAppointments();
    }
  }, [tabIndex, getListAppointments]);

  const getMonthsEvents = async (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const appointments = await appointmentsService.getAppointmentsForCalendar(
      start,
      end
    );

    setAppointments(appointments);
  };

  const addAppointmentToList = (appointment: AppointmentWithUser) => {
    setAppointments(
      [...appointments, appointment].sort(sortAppointmentsByStartTime)
    );

    setListAppointments(
      [...listAppointments, appointment].sort(sortAppointmentsByStartTime)
    );
  };

  const editAppointment = (appointment: AppointmentWithUser) => {
    setSelectedAppointment(appointment);
    onEditOpen();
  };

  const updateAppointmentsList = (appointment: AppointmentWithUser) => {
    const updatedCalendarAppointments = appointments
      .map(u => {
        if (u.id === appointment.id) {
          return appointment;
        }
        return u;
      })
      .sort(sortAppointmentsByStartTime);

    const updatedListAppointments = listAppointments
      .map(u => {
        if (u.id === appointment.id) {
          return appointment;
        }
        return u;
      })
      .sort(sortAppointmentsByStartTime);

    setAppointments(updatedCalendarAppointments);
    setListAppointments(updatedListAppointments);
  };

  const confirmAppointmentDelete = (appointment: AppointmentWithUser) => {
    setSelectedAppointment(appointment);
    onConfirmOpen();
  };

  const deleteAppointment = async (appointment: AppointmentWithUser) => {
    try {
      onConfirmClose();
      await appointmentsService.deleteAppointment(appointment.id);
      toast.success('Appointment deleted successfully');
      const updatedCalendarAppointments = appointments
        .filter(u => u.id !== appointment.id)
        .sort(sortAppointmentsByStartTime);
      const updatedListAppointments = listAppointments
        .filter(u => u.id !== appointment.id)
        .sort(sortAppointmentsByStartTime);
      setAppointments(updatedCalendarAppointments);
      setListAppointments(updatedListAppointments);
    } catch (e) {}
  };

  return (
    <>
      <Box
        width={['100%', '90%', '85%', '80%']}
        borderWidth="1px"
        borderRadius="lg"
        shadow={'md'}
        padding={'1rem 2rem'}
        bg="white"
        overflow={'auto'}
        style={{ margin: '2rem 0' }}
      >
        <Flex
          justify={['center', 'center', 'space-between']}
          alignItems={'center'}
          direction={['column', 'column', 'row']}
          gap={'0.5rem'}
        >
          <Text fontSize={'2xl'} textAlign="center">
            Appointments
          </Text>

          <Button
            maxW={'lg'}
            w={['100%', '100%', 'auto']}
            colorScheme={'facebook'}
            size="sm"
            onClick={() => addAppointment()}
          >
            Add Appointment
          </Button>
        </Flex>

        <Tabs onChange={index => setTabIndex(index)}>
          <TabList>
            <Tab>Calendar</Tab>
            <Tab>List</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MyCalendar
                events={appointments.map(toCalendarEvent)}
                editAppointment={editAppointment}
                getMonthsEvents={getMonthsEvents}
              />
            </TabPanel>
            <TabPanel>
              <AppointmentsTable
                confirmAppointmentDelete={confirmAppointmentDelete}
                editAppointment={editAppointment}
                appointments={listAppointments!}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        message="Do you want to delete this appointment?"
        confirmFn={() => deleteAppointment(selectedAppointment!)}
      />
      <EditAdminAppointmentModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        addNewAppointmentToList={addAppointmentToList}
        updateAppointmentsList={updateAppointmentsList}
        selectedAppointment={selectedAppointment}
      />
    </>
  );
};

export default AdminAppointmentsList;

AdminAppointmentsList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
