import { Container, Flex } from '@chakra-ui/react';
const Layout: React.FC = ({ children }) => {
  return (
    <Container minH={'100vh'} bg="cyan.200" minW={'100vw'}>
      <Flex justify="center" align="center" height="100vh">
        {children}
      </Flex>
    </Container>
  );
};

export default Layout;
