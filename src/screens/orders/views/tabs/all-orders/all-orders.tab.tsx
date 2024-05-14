import { View } from '@gluestack-ui/themed';
import { useLazyFetchOrdersQuery } from 'src/api';

import { OrderList } from '../../order-list/order-list';

export const AllOrdersTab = () => {
  return (
    <>
      <View flex={1}>
        <OrderList status={undefined} lazyQuery={useLazyFetchOrdersQuery} />
      </View>
    </>
  );
};
