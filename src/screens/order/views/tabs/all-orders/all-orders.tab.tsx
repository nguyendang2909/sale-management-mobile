import { View } from '@gluestack-ui/themed';
import { CreateOrderFab } from 'src/screens/products/views/buttons/create-order-fab';

import { OrderList } from './flat-list/order-list';

export const AllOrdersTab = () => {
  return (
    <View flex={1}>
      <View flex={1} mt={16}>
        <OrderList />
      </View>
      <CreateOrderFab />
    </View>
  );
};
