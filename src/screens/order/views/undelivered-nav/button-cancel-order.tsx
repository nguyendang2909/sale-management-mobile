import { Button, ButtonText } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { useLazyFetchOrderQuery, useUpdateOrderMutation } from 'src/api';
import { HOME_SCREENS, ORDER_STATUSES_MAP, SCREENS } from 'src/constants';
import { useDisclose, useMessages } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';

import { DialogCancelOrder } from './dialog-cancel-order';

export const ButtonCancelOrder: FC<{ orderId: string }> = ({ orderId }) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [updateOrder, { isLoading: isUpdatingOrder }] = useUpdateOrderMutation();
  const [fetchOrder, { isLoading: isFetchingOrder }] = useLazyFetchOrderQuery();
  const { formatErrorMessage } = useMessages();

  const handleSubmit = useCallback(async () => {
    try {
      await updateOrder({ id: orderId, body: { status: ORDER_STATUSES_MAP.CANCELLED } }).unwrap();
      await fetchOrder(orderId);
      goBack(SCREENS.HOME, {
        screen: HOME_SCREENS.ORDERS,
      });
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      onClose();
    }
  }, [fetchOrder, formatErrorMessage, onClose, orderId, updateOrder]);

  return (
    <>
      <Button variant="outline" isDisabled={isUpdatingOrder || isFetchingOrder} onPress={onOpen}>
        <ButtonText>Huỷ</ButtonText>
      </Button>

      <DialogCancelOrder
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isUpdatingOrder || isFetchingOrder}
      />
    </>
  );
};
