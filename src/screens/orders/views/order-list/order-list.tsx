import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC, useCallback, useState } from 'react';
import { UserOrder } from 'src/hooks';

import { DialogCancelOrder } from './dialog/dialog-cancel-order';
import { OrderListItem } from './order-list-item';

export const OrderList: FC<{ query: UserOrder }> = ({ query }) => {
  const { data: orders, isRefreshing, refresh } = query;

  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  const handleCloseOrder = useCallback(() => {
    setCancelOrderId(null);
  }, []);

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
          renderItem={({ item }) => <OrderListItem order={item} onCancel={setCancelOrderId} />}
          estimatedItemSize={100}
          ListFooterComponent={<View mb={100}></View>}
        ></FlashList>
      </View>

      <DialogCancelOrder cancelOrderId={cancelOrderId} onClose={handleCloseOrder} />
    </>
  );
};
