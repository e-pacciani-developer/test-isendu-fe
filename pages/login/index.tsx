import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { User } from '../../models/user';
import { usersService } from '../../services/user.service';
import { currentUserAtom } from '../../store';
import SignIn from './SignIn';
import SignUp from './SignUp';

export const getServerSideProps = async () => {
  const users = await usersService.getAllUsers();
  return {
    props: { users },
  };
};

const LoginPage: React.VFC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ users }) => {
  const router = useRouter();

  const [, setCurrentUser] = useAtom(currentUserAtom);

  const signInAs = (userId: string) => {
    const currentUser = users.find(user => user.id === userId);

    if (currentUser) {
      setCurrentUser(currentUser);
      router.push(`/appointments/${userId}`);
    }
  };

  const signInAfterSignUp = (user: User) => {
    setCurrentUser(user);
    router.push(`/appointments/${user.id}`);
  };

  return (
    <Container minH={'100vh'} bg="gray.200" minW={'100vw'} padding="0">
      <Flex justify="center" align="center" height={'100vh'}>
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
                <SignIn users={users} signInAs={signInAs} />
              </TabPanel>
              <TabPanel>
                <SignUp signInAfterSignUp={signInAfterSignUp} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default LoginPage;
