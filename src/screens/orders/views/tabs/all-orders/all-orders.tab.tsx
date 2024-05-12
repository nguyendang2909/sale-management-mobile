import { View } from '@gluestack-ui/themed';

import { OrderList } from '../../order-list/order-list';

export const AllOrdersTab = () => {
  return (
    <View flex={1}>
      <OrderList />
    </View>
  );
};
