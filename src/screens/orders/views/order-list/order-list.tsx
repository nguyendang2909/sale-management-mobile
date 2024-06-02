import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC, useState } from 'react';
import { UserOrder } from 'src/hooks';

import { DeleteOrderListItemDialog } from '../delete-order-list-item-dialog';
import { OrderListItem } from './order-list-item';

export const OrderList: FC<{ query: UserOrder }> = ({ query }) => {
  const { data: orders, isRefreshing, refresh, deleteById } = query;

  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

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
