import { View } from '@gluestack-ui/themed';
import { useLazyFetchDeliveredOrdersQuery } from 'src/api';
import { ORDER_STATUSES_MAP } from 'src/constants';

import { ContentOrdersTab } from '../content-orders-tab';

export const OrderDeliveredTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrdersTab
          description="Chưa có đơn hàng thành công"
          status={ORDER_STATUSES_MAP.DELIVERED}
          lazyQuery={useLazyFetchDeliveredOrdersQuery}
        />
      </View>
    </>
  );
};
