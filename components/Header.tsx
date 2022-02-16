import { Box, Flex, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from '../models/user';
import { currentUserAtom } from '../store';

const Header: React.VFC = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.role === 'ADMIN');
    }
  }, [currentUser]);

  const goToUsersList = () => {
    router.push(`/users/${currentUser?.id}`);
  };

  const goToAppointmentsList = () => {
    router.push(`/admin-appointments/${currentUser?.id}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  return (
    <Box bg="facebook.600" w="100%" p={4} color="white" h={'80px'}>
      <Flex justifyContent={isAdmin ? 'space-between' : 'flex-end'}>
        {isAdmin && (
          <>
            <div></div>
            <div>
              <Button
                onClick={goToUsersList}
                colorScheme={'whiteAlpha'}
                mr={'2rem'}
                size={'sm'}
              >
                Users
              </Button>
              <Button
                onClick={goToAppointmentsList}
                colorScheme={'whiteAlpha'}
                size={'sm'}
              >
                Appointments
              </Button>
            </div>
          </>
        )}
        <Button colorScheme={'facebook'} size={'sm'} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
