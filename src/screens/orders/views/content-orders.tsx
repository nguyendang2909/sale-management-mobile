import { View } from '@gluestack-ui/themed';
import { CreateOrderFab } from 'src/screens/products/views/buttons/create-order-fab';

import { OrderTabs } from './tabs/order-tabs';

export const ContentOrders = () => {
  return (
    <View flex={1}>
      <OrderTabs />
      <CreateOrderFab />
    </View>
  );
};
