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
import { useLazyFetchOrderQuery, useUpdateOrderMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { ORDER_STATUSES } from 'src/constants';
import { useMessages } from 'src/hooks';

export const DialogCancelOrder: FC<{
  cancelOrderId: string | null;
  onClose: () => void;
}> = ({ cancelOrderId, onClose }) => {
  const { formatErrorMessage } = useMessages();
  const [updateOrder, { isLoading: isLoadingUpdateOrder }] = useUpdateOrderMutation();
  const [fetchOrder, { isLoading: isLoadingFetchOrder }] = useLazyFetchOrderQuery();

  const handleSubmit = useCallback(async () => {
    try {
      if (cancelOrderId) {
        await updateOrder({
          id: cancelOrderId,
          body: {
            status: ORDER_STATUSES.CANCELLED,
          },
        }).unwrap();
        fetchOrder(cancelOrderId);
      }
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      onClose();
    }
  }, [cancelOrderId, fetchOrder, formatErrorMessage, onClose, updateOrder]);

  const isLoading = isLoadingUpdateOrder || isLoadingFetchOrder;

  return (
    <Modal isOpen={!!cancelOrderId} onClose={onClose}>
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

          <Button borderWidth="$0" onPress={handleSubmit} disabled={isLoading}>
            <ButtonText>Xác nhận</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
