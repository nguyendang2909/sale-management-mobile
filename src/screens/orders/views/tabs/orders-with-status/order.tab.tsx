import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { OrderStatus } from 'src/types';

import { OrderList } from './flat-list/order-list';

export const OrderTab: FC<{ status: OrderStatus }> = ({ status }) => {
  return (
    <View flex={1}>
      <OrderList status={status} />
    </View>
  );
};
