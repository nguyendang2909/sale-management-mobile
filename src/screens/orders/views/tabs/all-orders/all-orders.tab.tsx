import { View } from '@gluestack-ui/themed';
import { useLazyFetchOrdersQuery } from 'src/api';

import { ContentOrders } from '../../content-orders';

export const AllOrdersTab = () => {
  return (
    <View flex={1}>
      <ContentOrders status={undefined} lazyQuery={useLazyFetchOrdersQuery} />
    </View>
  );
};
