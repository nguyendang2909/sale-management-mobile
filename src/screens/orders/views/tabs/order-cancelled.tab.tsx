import { View } from '@gluestack-ui/themed';
import { useLazyFetchCancelledOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrdersTab } from '../content-orders-tab';

export const OrderCancelledTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrdersTab
          description="Không có đơn hàng bị huỷ"
          status={ORDER_STATUSES.CANCELLED}
          lazyQuery={useLazyFetchCancelledOrdersQuery}
        />
      </View>
    </>
  );
};
