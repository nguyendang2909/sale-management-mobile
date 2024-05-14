import { View } from '@gluestack-ui/themed';
import { useLazyFetchUnconfirmedOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { OrderList } from '../../order-list/order-list';

export const OrderWaitToConfirmTab = () => {
  return (
    <>
      <View flex={1}>
        <OrderList
          status={ORDER_STATUSES.UNCONFIRMED}
          lazyQuery={useLazyFetchUnconfirmedOrdersQuery}
        />
      </View>
    </>
  );
};
