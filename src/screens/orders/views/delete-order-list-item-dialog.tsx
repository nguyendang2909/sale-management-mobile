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

export const CancelOrderDialog: FC<{
  cancelOrderId: string | null;
  setCancelOrderId: (id: string | null) => void;
}> = ({ cancelOrderId, setCancelOrderId }) => {
  const { formatErrorMessage } = useMessages();
  const [updateOrder, { isLoading: isLoadingUpdateOrder }] = useUpdateOrderMutation();
  const [fetchOrder, { isLoading: isLoadingFetchOrder }] = useLazyFetchOrderQuery();

  const handleClose = useCallback(() => {
    setCancelOrderId(null);
  }, [setCancelOrderId]);

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
      setCancelOrderId(null);
    }
  }, [cancelOrderId, fetchOrder, formatErrorMessage, setCancelOrderId, updateOrder]);

  return (
    <Modal isOpen={!!cancelOrderId} onClose={handleClose}>
      <LoadingOverlay isLoading={isLoadingUpdateOrder || isLoadingFetchOrder} />
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
