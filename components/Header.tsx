import { Box, Flex, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { User } from '../models/user';
import { currentUserAtom } from '../store';

const Header: React.VFC = () => {
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const router = useRouter();

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  return (
    <Box bg="facebook.600" w="100%" p={4} color="white" h={'80px'}>
      <Flex justifyContent={'flex-end'}>
        <Button colorScheme={'facebook'} size={'sm'} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
