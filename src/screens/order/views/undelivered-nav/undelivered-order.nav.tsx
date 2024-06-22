import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { ViewFooter } from 'src/components';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { AppStore, ViewProps } from 'src/types';

import { ButtonCancelOrder } from './button-cancel-order';

export const UndeliveredOrderNav: FC<
  ViewProps & {
    order: AppStore.Order;
  }
> = ({ order, ...viewProps }) => {
  const handleDelivery = useCallback(() => {
    navigate(SCREENS.ORDER_PAYMENT, { order, updateStatusDelivered: true });
  }, [order]);

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
