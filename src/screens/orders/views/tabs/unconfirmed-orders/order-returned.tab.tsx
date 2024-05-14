import { View } from '@gluestack-ui/themed';
import { useLazyFetchReturnedOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { OrderList } from '../../order-list/order-list';

export const OrderReturnedTab = () => {
  return (
    <>
      <View flex={1}>
        <OrderList status={ORDER_STATUSES.RETURNED} lazyQuery={useLazyFetchReturnedOrdersQuery} />
      </View>
    </>
  );
};
