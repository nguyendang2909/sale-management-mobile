import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useOrders } from 'src/hooks';

import { OrderListItem } from './order-list-item';

export const OrderList = () => {
  const { data: orders } = useOrders({});

  return (
    <View flex={1}>
      <FlashList
        showsVerticalScrollIndicator={false}
        // refreshing={isFetchingProducts}
        // onRefresh={refetchProducts}
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
