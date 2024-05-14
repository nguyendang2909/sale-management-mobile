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

export const DeleteOrderListItemDialog: FC<{
  deleteOrderId: string | null;
  setDeleteOrderId: (id: string | null) => void;
  onDelete: (id: string) => void;
}> = ({ deleteOrderId, setDeleteOrderId, onDelete }) => {
  const { formatErrorMessage } = useMessages();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleClose = useCallback(() => {
    setDeleteOrderId(null);
  }, [setDeleteOrderId]);

  const handleSubmit = useCallback(async () => {
    try {
      if (deleteOrderId) {
        await deleteOrder(deleteOrderId).unwrap();
        onDelete(deleteOrderId);
      }
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      setDeleteOrderId(null);
    }
  }, [deleteOrder, deleteOrderId, formatErrorMessage, onDelete, setDeleteOrderId]);

  return (
    <Modal isOpen={!!deleteOrderId} onClose={handleClose}>
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
            onPress={handleClose}
          >
            <ButtonText>Quay lại</ButtonText>
          </Button>
          <Button borderWidth="$0" onPress={handleSubmit}>
            <ButtonText>Xác nhận</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
