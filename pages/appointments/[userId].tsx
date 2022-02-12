import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
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
      <h1>Appointments for {userId}</h1>;
      <ul>
        {appointments.data.map(appointment => (
          <li key={appointment.id}>
            {appointment.description} - {appointment.userId}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Appointments;
