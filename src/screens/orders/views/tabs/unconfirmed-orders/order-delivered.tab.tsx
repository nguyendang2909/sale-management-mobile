import { View } from '@gluestack-ui/themed';
import { useLazyFetchDeliveredOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { OrderList } from '../../order-list/order-list';

export const OrderDeliveredTab = () => {
  return (
    <>
      <View flex={1}>
        <OrderList status={ORDER_STATUSES.DELIVERED} lazyQuery={useLazyFetchDeliveredOrdersQuery} />
      </View>
    </>
  );
};
