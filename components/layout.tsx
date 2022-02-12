import { Container, Flex } from '@chakra-ui/react';
const Layout: React.FC = ({ children }) => {
  return (
    <Container minH={'100vh'}>
      <Flex justify="center" align="center" height="100vh">
        {children}
      </Flex>
    </Container>
  );
};

export default Layout;
