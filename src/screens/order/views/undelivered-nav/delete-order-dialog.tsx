import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gluestack-ui/themed';
import { FC } from 'react';
import { LoadingOverlay } from 'src/components';
import { useMessages } from 'src/hooks';

export const DialogDeleteOrder: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: () => void;
}> = ({ onClose, isOpen, onSubmit, isSubmitting }) => {
  const { formatErrorMessage } = useMessages();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoadingOverlay isLoading={isSubmitting} />
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Huỷ đơn hàng</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Bạn có chắc chắn rằng muốn huỷ đơn hàng này?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            // action="secondary"
            mr="$3"
            onPress={onClose}
          >
            <ButtonText>Quay lại</ButtonText>
          </Button>
          <Button borderWidth="$0" onPress={onSubmit} isDisabled={isSubmitting}>
            <ButtonText>Xác nhận</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
