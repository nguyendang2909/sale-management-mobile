import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { UpdateOrderMutation } from 'src/api';
import { ViewFooter } from 'src/components';
import { ORDER_STATUSES_MAP, SCREENS } from 'src/constants';
import { RefetchOrder, useMessages } from 'src/hooks';
import { navigate } from 'src/navigations';
import { AppStore, ViewProps } from 'src/types';

import { ButtonCancelOrder } from './button-cancel-order';

export const UndeliveredOrderNav: FC<
  ViewProps & {
    order: AppStore.Order;
    shouldPay: boolean;
    updateOrderMutation: UpdateOrderMutation;
    refetchOrder: RefetchOrder;
  }
> = ({ order, shouldPay, updateOrderMutation, refetchOrder, ...viewProps }) => {
  const { formatErrorMessage } = useMessages();
  const handleDelivery = useCallback(async () => {
    if (shouldPay) {
      navigate(SCREENS.ORDER_PAYMENT, { order, updateStatusDelivered: true });
      return;
    }
    try {
      await updateOrderMutation({
        id: order.id,
        body: {
          status: ORDER_STATUSES_MAP.DELIVERED,
        },
      }).unwrap();
      await refetchOrder();
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  }, [formatErrorMessage, order, refetchOrder, shouldPay, updateOrderMutation]);

  return (
    <>
      <ViewFooter {...viewProps} pt={16}>
        <View flexDirection="row" columnGap={16} px={16}>
          <View flex={1}>
            <ButtonCancelOrder orderId={order.id} />
          </View>
          <View flex={1}>
            <Button onPress={handleDelivery} size="sm">
              <ButtonText>Đã giao</ButtonText>
            </Button>
          </View>
        </View>
      </ViewFooter>
    </>
  );
};
