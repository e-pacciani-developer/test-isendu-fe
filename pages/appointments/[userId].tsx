import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import AppointmentsList from './AppointmentList';
import { getUserAppointments } from './appointments.helpers';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.params?.userId as string;

  const appointments = await getUserAppointments(1, 20, userId);

  return {
    props: { userId, appointments },
  };
};

const Appointments: React.VFC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userId, appointments }) => {
  return (
    <>
      <AppointmentsList appointments={appointments.data}></AppointmentsList>
    </>
  );
};

export default Appointments;
