import { View } from '@gluestack-ui/themed';
import { useLazyFetchDeliveredOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrders } from '../../content-orders';

export const OrderDeliveredTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrders
          status={ORDER_STATUSES.DELIVERED}
          lazyQuery={useLazyFetchDeliveredOrdersQuery}
        />
      </View>
    </>
  );
};
