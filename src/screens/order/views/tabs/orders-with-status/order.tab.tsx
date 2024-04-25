import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { CreateOrderFab } from 'src/screens/products/views/buttons/create-order-fab';
import { OrderStatus } from 'src/types';

import { OrderList } from './flat-list/order-list';

export const OrderTab: FC<{ status: OrderStatus }> = ({ status }) => {
  return (
    <View flex={1}>
      <View flex={1} mt={16}>
        <OrderList status={status} />
      </View>
      <CreateOrderFab />
    </View>
  );
};
