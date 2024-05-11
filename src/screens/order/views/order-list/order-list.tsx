import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { useOrders } from 'src/hooks';

import { DeleteOrderDialog } from '../delete-order-dialog';
import { OrderListItem } from './order-list-item';

export const OrderList = () => {
  const { data: orders, isRefreshing, refresh, deleteById } = useOrders({});

  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  const handleDelivery = () => {};

  return (
    <>
      <View flex={1}>
        <FlashList
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={refresh}
          numColumns={1}
          data={orders}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => (
            <OrderListItem order={item} onDelete={setDeleteOrderId} onDelivery={handleDelivery} />
          )}
          estimatedItemSize={1}
          ListFooterComponent={<View mb={100}></View>}
        ></FlashList>
      </View>
      <DeleteOrderDialog
        deleteOrderId={deleteOrderId}
        setDeleteOrderId={setDeleteOrderId}
        onDelete={deleteById}
      />
    </>
  );
};
