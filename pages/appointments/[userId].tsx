import { Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../components/Layout';
import { appointmentsService } from '../../services/appointments.service';
import { usersService } from '../../services/user.service';
import { currentUserAtom } from '../../store';
import AppointmentsList from './AppointmentList';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.params?.userId as string;

  const user = await usersService.getUserById(userId);

  const appointments = await appointmentsService.getUserAppointments(
    1,
    20,
    userId
  );

  return {
    props: { user, appointments },
  };
};

const Appointments = ({
  user,
  appointments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user, setCurrentUser, appointments]);

  return (
    <VStack>
      <Text fontSize={'2xl'} marginBottom="2">
        Welcome back, {user.name}{' '}
      </Text>
      <AppointmentsList
        _appointments={appointments.data}
        userId={user.id}
      ></AppointmentsList>
    </VStack>
  );
};

Appointments.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Appointments;
