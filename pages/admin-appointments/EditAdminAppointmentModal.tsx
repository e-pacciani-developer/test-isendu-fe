import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { VisitTypes } from '../../constants/visit-type';
import {
  Appointment,
  AppointmentWithUser,
  CreateAppointmentDTO,
} from '../../models/appointment';
import {
  formIsValid,
  generateStartAndEndDates,
  setCurrentDate,
} from '../appointments/appointments.helpers';
import { toast } from 'react-toastify';
import { appointmentsService } from '../../services/appointments.service';
import { User } from '../../models/user';
import { useEffect, useState } from 'react';
import { usersService } from '../../services/user.service';
import { format } from 'date-fns';

interface AddAdminAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
  addNewAppointmentToList: (appointment: AppointmentWithUser) => void;
  updateAppointmentsList: (appointment: AppointmentWithUser) => void;
  selectedAppointment: Appointment | null;
}

export interface AddAdminAppointmentFormFields {
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  notes: string;
  user: User;
}

const EditAdminAppointmentModal: React.VFC<AddAdminAppointmentProps> = ({
  isOpen,
  onClose,
  addNewAppointmentToList,
  updateAppointmentsList,
  selectedAppointment,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(
    selectedAppointment
  );
  const onSubmit = handleSubmit(async data => {
    const formData = data as AddAdminAppointmentFormFields;

    const [startAt, endAt] = generateStartAndEndDates(
      formData.date,
      formData.startTime,
      formData.endTime
    );

    if (!formIsValid(startAt, endAt)) {
      return;
    }

    if (!appointment?.id) {
      const appointmentToCreate: CreateAppointmentDTO = {
        startAt,
        endAt,
        userId: formData.user.id,
        type: formData.type,
        notes: formData.notes,
      };

      try {
        const newAppointment = await appointmentsService.createAppointment(
          appointmentToCreate
        );

        const newAppointmentWithUser = {
          ...newAppointment,
          user: formData.user,
        };

        addNewAppointmentToList(newAppointmentWithUser);
        toast.success('Appointment created successfully');

        onClose();
      } catch (e) {}
    } else {
      const appointmentToUpdate: Appointment = {
        id: appointment.id,
        startAt,
        endAt,
        userId: formData.user.id,
        type: formData.type,
        notes: formData.notes,
      };

      try {
        await appointmentsService.updateAppointment(appointmentToUpdate);

        const updatedAppointmentWithUser = {
          ...appointmentToUpdate,
          user: formData.user,
        };

        updateAppointmentsList(updatedAppointmentWithUser);
        toast.success('Appointment updated successfully');

        onClose();
      } catch (e) {}
    }
  });

  const getUsers = async () => {
    const users = await usersService.getAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedAppointment) {
      reset({
        startTime: format(new Date(selectedAppointment.startAt), 'HH:mm'),
        endTime: format(new Date(selectedAppointment.endAt), 'HH:mm'),
        date: format(new Date(selectedAppointment.startAt), 'yyyy-MM-dd'),
        user: selectedAppointment.userId,
        notes: selectedAppointment.notes,
        type: selectedAppointment.type,
      });

      setAppointment(selectedAppointment);
    } else {
      reset({});
      setAppointment({} as Appointment);
    }
  }, [selectedAppointment, setAppointment, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Appointment</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel htmlFor="user">User</FormLabel>
                <Select
                  placeholder="Select a user"
                  background="white"
                  {...register('user', {
                    required: true,
                    setValueAs: (value: string) =>
                      users.find(u => u.id === value),
                  })}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  id="date"
                  defaultValue={setCurrentDate()}
                  {...register('date', { required: true })}
                  type="date"
                />
              </FormControl>

              <Flex w="100%" gap="0.5rem">
                <FormControl>
                  <FormLabel htmlFor="startTime">From</FormLabel>
                  <Input
                    {...register('startTime', { required: true })}
                    type="time"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="endTime">To</FormLabel>
                  <Input
                    {...register('endTime', { required: true })}
                    type="time"
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel htmlFor="type">Type</FormLabel>
                <Select
                  defaultValue="Teeth Cleaning"
                  {...register('type', { required: true })}
                >
                  {VisitTypes.map((type, i) => (
                    <option key={i}>{type}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="desciption">Notes</FormLabel>
                <Textarea
                  {...register('notes')}
                  placeholder="Insert notes here if you want to add any detail"
                  rows={5}
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
            <Button colorScheme={'blue'} size="sm" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditAdminAppointmentModal;
