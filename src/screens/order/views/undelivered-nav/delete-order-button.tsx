import { Button, ButtonText } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { useDeleteOrderMutation } from 'src/api';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useAppDispatch, useDisclose, useMessages } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { orderActions } from 'src/store/order';

import { DialogDeleteOrder } from './delete-order-dialog';

export const ButtonDeleteOrder: FC<{ orderId: string; isDeleting: boolean }> = ({ orderId }) => {
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclose();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const { formatErrorMessage } = useMessages();

  const handleSubmit = useCallback(async () => {
    try {
      await deleteOrder(orderId).unwrap();
      dispatch(orderActions.deleteOrder(orderId));
      goBack(SCREENS.Home, {
        screen: HOME_SCREENS.ORDERS,
      });
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      onClose();
    }
  }, [deleteOrder, formatErrorMessage, onClose, orderId]);

  return (
    <>
      <Button variant="outline" disabled={isDeleting} onPress={onOpen}>
        <ButtonText>Huỷ</ButtonText>
      </Button>
      <DialogDeleteOrder
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isDeleting}
      />
    </>
  );
};
