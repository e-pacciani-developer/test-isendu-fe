import { Flex, Select, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { User } from '../../models/user';

export interface SignInProps {
  users: User[];
  signInAs: (userId: string) => void;
}

const SignIn: React.VFC<SignInProps> = ({ users, signInAs }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <Flex flexDir={'column'} gap="1rem" alignItems={'center'}>
      <Text fontSize={'2xl'}>Sign in as:</Text>
      <Select
        placeholder="Select an option"
        background="white"
        onChange={e => setSelectedUserId(e.target.value)}
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.role})
          </option>
        ))}
      </Select>
      <Button
        colorScheme={'facebook'}
        marginTop="2rem"
        width={'100%'}
        disabled={!selectedUserId}
        onClick={() => selectedUserId && signInAs(selectedUserId)}
      >
        SIGN IN
      </Button>
    </Flex>
  );
};

export default SignIn;
