import { Box, Flex, Button } from '@chakra-ui/react';

const Header: React.VFC = () => {
  return (
    <Box bg="facebook.600" w="100%" p={4} color="white" h={'80px'}>
      <Flex justifyContent={'flex-end'}>
        <Button colorScheme={'facebook'} size={'sm'}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
