import { Flex, Select, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { User } from '../../models/user';

export interface SignInProps {
  users: User[];
}

const SignIn: React.VFC<SignInProps> = ({ users }) => {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const signInAs = () => {
    if (selectedUserId) {
      router.push(`/appointments/${selectedUserId}`);
    }
  };

  return (
    <Flex flexDir={'column'} gap="1rem" alignItems={'center'}>
      <Text fontSize={'2xl'}>Log in as:</Text>
      <Select
        placeholder="Select an option"
        background="white"
        onChange={e => setSelectedUserId(e.target.value)}
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
      <Button
        colorScheme={'blue'}
        marginTop="2rem"
        width={'100%'}
        onClick={() => signInAs()}
      >
        SIGN IN
      </Button>
    </Flex>
  );
};

export default SignIn;
