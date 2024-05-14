import { View } from '@gluestack-ui/themed';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { LoadingOverlay } from 'src/components';
import { useOrders } from 'src/hooks';
import { ApiRequest, ApiResponse, OrderStoreStatus } from 'src/types';

import { DeleteOrderListItemDialog } from '../delete-order-list-item-dialog';
import { OrderListItem } from './order-list-item';

export const OrderList = ({
  status,
  lazyQuery,
}: {
  status?: OrderStoreStatus;
  lazyQuery: UseLazyQuery<
    QueryDefinition<ApiRequest.FindManyOrders, any, any, ApiResponse.Orders, 'api'>
  >;
}) => {
  const {
    data: orders,
    isRefreshing,
    refresh,
    deleteById,
    isLoading,
  } = useOrders({
    status,
    lazyQuery,
  });

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
