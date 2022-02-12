import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { InferGetServerSidePropsType } from 'next';
import { getAllUsers } from './login.helpers';
import SignIn from './SignIn';

export const getServerSideProps = async () => {
  const users = await getAllUsers();
  return {
    props: { users },
  };
};

const LoginPage: React.VFC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ users }) => {
  return (
    <Box
      width={['100%', '70%', '30rem']}
      borderWidth="1px"
      borderRadius="lg"
      padding={'2rem'}
      bg="white"
    >
      <Text
        marginBottom={'1rem'}
        fontSize={'3xl'}
        fontWeight="bold"
        textAlign={'center'}
      >
        Welcome
      </Text>
      <Tabs>
        <TabList>
          <Tab>Sign In</Tab>
          <Tab>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SignIn users={users} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LoginPage;
