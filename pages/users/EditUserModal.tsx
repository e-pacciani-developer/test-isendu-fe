import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  Textarea,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { VisitTypes } from '../../constants/visit-type';
import { User } from '../../models/user';
import { usersService } from '../../services/user.service';
import { setCurrentDate } from '../appointments/appointments.helpers';

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  addUserToList: (user: User) => void;
  updateUsersList: (user: User) => void;
}

const EditUserModal: React.VFC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  addUserToList,
  updateUsersList,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const [currentUser, setCurrentUser] = useState<User>(user);

  useEffect(() => {
    if (user) {
      reset(user);
      setCurrentUser(user);
    }
  }, [user, setCurrentUser, reset]);

  const onSubmit = handleSubmit(async data => {
    const formData = data as User;

    try {
      if (currentUser.id) {
        formData.id = currentUser.id;
        const user = await usersService.updateUser(formData);
        toast.success('User updated successfully');
        updateUsersList(user);
      } else {
        const user = await usersService.createUser(formData);
        toast.success('User created successfully');
        addUserToList(user);
      }

      onClose();
    } catch (e) {}
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit} autoComplete="off">
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  defaultValue={currentUser.name}
                  {...register('name', {
                    required: true,
                  })}
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
                <Input
                  {...register('dateOfBirth', {
                    required: true,
                    setValueAs: (value: string) => new Date(value),
                  })}
                  type="date"
                  value={
                    currentUser.dateOfBirth
                      ? format(new Date(currentUser.dateOfBirth), 'yyyy-MM-dd')
                      : undefined
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  defaultValue={currentUser.address}
                  {...register('address', {
                    required: true,
                  })}
                  type="text"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="name">Email</FormLabel>
                <Input
                  defaultValue={currentUser.email}
                  {...register('email', {
                    required: true,
                  })}
                  type="text"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  defaultValue={currentUser.phone}
                  {...register('phone', {
                    required: true,
                  })}
                  type="text"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={3}
              onClick={onClose}
              size="sm"
            >
              Close
            </Button>
            <Button colorScheme={'facebook'} size="sm" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
