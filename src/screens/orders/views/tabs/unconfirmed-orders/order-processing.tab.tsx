import { View } from '@gluestack-ui/themed';
import { useLazyFetchProcessingOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { OrderList } from '../../order-list/order-list';

export const OrderProcessingTab = () => {
  return (
    <>
      <View flex={1}>
        <OrderList
          status={ORDER_STATUSES.PROCESSING}
          lazyQuery={useLazyFetchProcessingOrdersQuery}
        />
      </View>
    </>
  );
};
