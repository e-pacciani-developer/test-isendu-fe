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
import { setCurrentDate } from './appointments.helpers';

interface AddAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAppointmentModal: React.VFC<AddAppointmentProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Appointment</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  id="date"
                  defaultValue={setCurrentDate()}
                  {...register('selectedDate', { required: true })}
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
