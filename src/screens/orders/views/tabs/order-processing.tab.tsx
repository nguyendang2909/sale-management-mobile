import { View } from '@gluestack-ui/themed';
import { useLazyFetchProcessingOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrders } from '../content-orders';

export const OrderProcessingTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrders
          description="Chưa có đơn hàng"
          status={ORDER_STATUSES.PROCESSING}
          lazyQuery={useLazyFetchProcessingOrdersQuery}
        />
      </View>
    </>
  );
};
