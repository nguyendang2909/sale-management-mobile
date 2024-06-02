import { View } from '@gluestack-ui/themed';
import { useLazyFetchCancelledOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrders } from '../../content-orders';

export const OrderCancelledTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrders
          description="Không có đơn hàng bị huỷ"
          status={ORDER_STATUSES.CANCELLED}
          lazyQuery={useLazyFetchCancelledOrdersQuery}
        />
      </View>
    </>
  );
};
