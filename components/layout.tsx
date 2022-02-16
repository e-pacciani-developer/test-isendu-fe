import { Container, Flex } from '@chakra-ui/react';
import Header from './Header';
const Layout: React.FC = ({ children }) => {
  return (
    <Container minH={'100vh'} bg="gray.200" minW={'100vw'} padding="0">
      <Header />
      <Flex justify="center" height={'calc(100vh - 80px)'}>
        {children}
      </Flex>
    </Container>
  );
};

export default Layout;
