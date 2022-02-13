import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';
import { appointmentsService } from '../../services/appointments.service';
import AppointmentsList from './AppointmentList';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.params?.userId as string;

  const appointments = await appointmentsService.getUserAppointments(
    1,
    20,
    userId
  );

  return {
    props: { userId, appointments },
  };
};

const Appointments = ({
  userId,
  appointments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AppointmentsList
      _appointments={appointments.data}
      userId={userId}
    ></AppointmentsList>
  );
};

Appointments.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Appointments;
