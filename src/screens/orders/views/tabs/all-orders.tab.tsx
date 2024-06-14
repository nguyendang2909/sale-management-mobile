import { View } from '@gluestack-ui/themed';
import { useLazyFetchOrdersQuery } from 'src/api';

import { ContentOrdersTab } from '../content-orders-tab';

export const AllOrdersTab = () => {
  return (
    <View flex={1}>
      <ContentOrdersTab status={undefined} lazyQuery={useLazyFetchOrdersQuery} />
    </View>
  );
};
