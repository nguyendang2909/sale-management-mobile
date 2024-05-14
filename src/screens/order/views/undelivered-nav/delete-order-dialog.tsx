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
import { FC, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { useDeleteOrderMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { useMessages } from 'src/hooks';

export const DialogDeleteOrder: FC<{
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ orderId, onClose, isOpen }) => {
  const { formatErrorMessage } = useMessages();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleSubmit = useCallback(async () => {
    try {
      await deleteOrder(orderId).unwrap();
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      onClose();
    }
  }, [deleteOrder, formatErrorMessage, onClose, orderId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoadingOverlay isLoading={isLoading} />
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
          <Button borderWidth="$0" onPress={handleSubmit} isDisabled={isLoading}>
            <ButtonText>Xác nhận</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
