import { View } from '@gluestack-ui/themed';
import { useLazyFetchReturnedOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrdersTab } from '../content-orders-tab';

export const OrderReturnedTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrdersTab
          description="Không có đơn hàng bị trả"
          status={ORDER_STATUSES.RETURNED}
          lazyQuery={useLazyFetchReturnedOrdersQuery}
        />
      </View>
    </>
  );
};
