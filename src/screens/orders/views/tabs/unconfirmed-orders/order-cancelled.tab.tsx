import { View } from '@gluestack-ui/themed';
import { useLazyFetchCancelledOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { OrderList } from '../../order-list/order-list';

export const OrderCancelledTab = () => {
  return (
    <>
      <View flex={1}>
        <OrderList status={ORDER_STATUSES.CANCELLED} lazyQuery={useLazyFetchCancelledOrdersQuery} />
      </View>
    </>
  );
};
