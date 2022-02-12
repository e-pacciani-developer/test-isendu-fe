import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface ConfirmModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  confirmFn: () => void;
}

const ConfirmModal: React.VFC<ConfirmModalProps> = ({
  isOpen,
  message,
  onClose,
  confirmFn,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={'xl'}>{message}</Text>
        </ModalBody>

        <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="ghost" mr={3} onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button colorScheme="red" mr={3} onClick={confirmFn} size="sm">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
