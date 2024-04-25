import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC } from 'react';
import { useOrders } from 'src/hooks';
import { OrderStatus } from 'src/types';

import { OrderListItem } from './order-list-item';

export const OrderList: FC<{ status: OrderStatus }> = ({ status }) => {
  const {
    data: orders,
    isRefreshing,
    refresh,
  } = useOrders({
    status,
  });

  return (
    <View flex={1}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={refresh}
        numColumns={1}
        data={orders}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => <OrderListItem order={item} />}
        estimatedItemSize={1}
        ListFooterComponent={<View mb={100}></View>}
      ></FlashList>
    </View>
  );
};
