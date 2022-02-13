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
import { Appointment, CreateAppointmentDTO } from '../../models/appointment';
import {
  formIsValid,
  generateStartAndEndDates,
  setCurrentDate,
} from './appointments.helpers';
import { toast } from 'react-toastify';
import { appointmentsService } from '../../services/appointments.service';

interface AddAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
  addNewAppointmentToList: (appointment: Appointment) => void;
  userId: string;
}

export interface AddAppointmentFormFields {
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  notes: string;
}

const AddAppointmentModal: React.VFC<AddAppointmentProps> = ({
  isOpen,
  onClose,
  addNewAppointmentToList,
  userId,
}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async data => {
    const formData = data as AddAppointmentFormFields;

    const [startAt, endAt] = generateStartAndEndDates(
      formData.date,
      formData.startTime,
      formData.endTime
    );

    if (!formIsValid(startAt, endAt)) {
      return;
    }

    const appointment: CreateAppointmentDTO = {
      startAt,
      endAt,
      userId,
      type: formData.type,
      notes: formData.notes,
    };

    try {
      const newAppointment = await appointmentsService.createAppointment(
        appointment
      );

      addNewAppointmentToList(newAppointment);
      toast.success('Appointment created successfully');

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
        <ModalHeader>Add Appointment</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <VStack>
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

export default AddAppointmentModal;
