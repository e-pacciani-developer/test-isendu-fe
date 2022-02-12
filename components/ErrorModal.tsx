import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}

const ErrorModal: React.VFC<ErrorModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={'xl'}>{message}</Text>
        </ModalBody>

        <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="ghost"
            colorScheme="red"
            mr={3}
            onClick={onClose}
            size="sm"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
