import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { LoadingOverlay } from 'src/components';
import { useOrders } from 'src/hooks';

import { DeleteOrderListItemDialog } from '../delete-order-list-item-dialog';
import { OrderListItem } from './order-list-item';

export const OrderList = () => {
  const { data: orders, isRefreshing, refresh, deleteById, isLoading } = useOrders({});

  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  return (
    <>
      <View flex={1}>
        <LoadingOverlay isLoading={isLoading} />
        <FlashList
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={refresh}
          numColumns={1}
          data={orders}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => <OrderListItem order={item} onDelete={setDeleteOrderId} />}
          estimatedItemSize={1}
          ListFooterComponent={<View mb={100}></View>}
        ></FlashList>
      </View>
      <DeleteOrderListItemDialog
        deleteOrderId={deleteOrderId}
        setDeleteOrderId={setDeleteOrderId}
        onDelete={deleteById}
      />
    </>
  );
};
