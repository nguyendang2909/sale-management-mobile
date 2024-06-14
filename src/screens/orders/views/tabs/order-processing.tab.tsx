import { View } from '@gluestack-ui/themed';
import { useLazyFetchProcessingOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrdersTab } from '../content-orders-tab';

export const OrderProcessingTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrdersTab
          description="Chưa có đơn hàng"
          status={ORDER_STATUSES.PROCESSING}
          lazyQuery={useLazyFetchProcessingOrdersQuery}
        />
      </View>
    </>
  );
};
