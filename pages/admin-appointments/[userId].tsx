import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';
import Layout from '../../components/Layout';
import { AppointmentWithUser } from '../../models/appointment';
import { appointmentsService } from '../../services/appointments.service';
import { usersService } from '../../services/user.service';
import { formatDates } from '../appointments/appointments.helpers';
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

  const appointments = await appointmentsService.getUserAppointments(
    1,
    30,
    userId,
    user.role
  );

  return {
    props: { appointmentsList: appointments.data, userId },
  };
};

const AdminAppointmentsList = ({
  appointmentsList,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithUser>({} as AppointmentWithUser);
  const [appointments, setAppointments] =
    useState<AppointmentWithUser[]>(appointmentsList);

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
    setSelectedAppointment({} as AppointmentWithUser);
    onEditOpen();
  };

  const addAppointmentToList = (appointment: AppointmentWithUser) => {
    setAppointments([...appointments, appointment]);
  };

  const editAppointment = (appointment: AppointmentWithUser) => {
    setSelectedAppointment(appointment);
    onEditOpen();
  };

  const updateAppointmentsList = (appointment: AppointmentWithUser) => {
    const updatedAppointments = appointments.map(u => {
      if (u.id === appointment.id) {
        return appointment;
      }
      return u;
    });
    setAppointments(updatedAppointments);
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
      const updatedAppointments = appointments.filter(
        u => u.id !== appointment.id
      );
      setAppointments(updatedAppointments);
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
            Aappointments
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
      </Box>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        message="Do you want to delete this appointment?"
        confirmFn={() => deleteAppointment(selectedAppointment)}
      />
      <EditAdminAppointmentModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        addNewAppointmentToList={addAppointmentToList}
        updateAppointmentsList={updateAppointmentsList}
      />
    </>
  );
};

export default AdminAppointmentsList;

AdminAppointmentsList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
