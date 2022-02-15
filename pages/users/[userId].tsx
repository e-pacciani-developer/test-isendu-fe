import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';
import Layout from '../../components/Layout';
import { User } from '../../models/user';
import { usersService } from '../../services/user.service';
import EditUserModal from './EditUserModal';
import debounce from 'lodash.debounce';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.params?.userId as string;

  const user = await usersService.getUserById(userId);

  if (user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const users = await usersService.getAllUsers();

  return {
    props: { usersList: users },
  };
};

const UsersList = ({
  usersList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>(usersList);
  const [query, setQuery] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );
  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const searchUsers = useCallback(async () => {
    const filteredUsers = await usersService.getAllUsers(query);
    setUsers(filteredUsers);
  }, [query]);

  useEffect(() => {
    searchUsers();
  }, [searchUsers]);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const addUser = () => {
    setSelectedUser({} as User);
    onEditOpen();
  };

  const addUserToList = (user: User) => {
    setUsers([...users, user]);
  };

  const editUser = (user: User) => {
    setSelectedUser(user);
    onEditOpen();
  };

  const updateUsersList = (user: User) => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const confirmUserDelete = (user: User) => {
    setSelectedUser(user);
    onConfirmOpen();
  };

  const deleteUser = async (user: User) => {
    try {
      onConfirmClose();
      await usersService.deleteUser(user.id);
      toast.success('User deleted successfully');
      const updatedUsers = users.filter(u => u.id !== user.id);
      setUsers(updatedUsers);
    } catch (e) {}
  };

  return (
    <>
      <Box
        width={['100%', '90%', '85%', '80%']}
        borderWidth="1px"
        borderRadius="lg"
        shadow={'md'}
        padding={'1rem 2rem'}
        bg="white"
        overflow={'auto'}
        style={{ margin: '2rem 0' }}
      >
        <Flex
          justify={['center', 'center', 'space-between']}
          alignItems={'center'}
          direction={['column', 'column', 'row']}
          gap={'0.5rem'}
        >
          <Text fontSize={'2xl'} textAlign="center">
            Users
          </Text>
          <Input
            maxW={'lg'}
            onChange={debouncedChangeHandler}
            placeholder={'Search by name...'}
          />
          <Button
            maxW={'lg'}
            w={['100%', '100%', 'auto']}
            colorScheme={'facebook'}
            size="sm"
            onClick={() => addUser()}
          >
            Add User
          </Button>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Date of birth</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.address}</Td>
                <Td>{format(new Date(user.dateOfBirth), 'dd/MM/yyyy')}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>
                  <Flex gap={'0.5rem'}>
                    <IconButton
                      onClick={() => editUser(user)}
                      size={'sm'}
                      colorScheme="facebook"
                      aria-label="Edit user"
                      icon={<EditIcon />}
                    />
                    <IconButton
                      onClick={() => confirmUserDelete(user)}
                      size={'sm'}
                      colorScheme="red"
                      aria-label="Delete user"
                      icon={<DeleteIcon />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        message="Do you want to delete this user and all the appointment connected?"
        confirmFn={() => deleteUser(selectedUser)}
      />
      <EditUserModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        user={selectedUser}
        addUserToList={addUserToList}
        updateUsersList={updateUsersList}
      />
    </>
  );
};

export default UsersList;

UsersList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
