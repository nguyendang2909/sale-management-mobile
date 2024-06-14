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

export const DialogCancelOrder: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}> = ({ onClose, isOpen, onSubmit, isSubmitting }) => {
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
