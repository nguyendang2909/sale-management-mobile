import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { ReactElement } from 'react';
import { ContentData } from 'src/components/content/content-data';
import { useOrders } from 'src/hooks';
import { ApiRequest, ApiResponse, OrderStoreStatus } from 'src/types';

import { OrderList } from './order-list/order-list';

export const ContentOrdersTab = ({
  status,
  lazyQuery,
  description,
  ActionComponent,
}: {
  ActionComponent?: ReactElement;
  description?: string;
  status?: OrderStoreStatus;
  lazyQuery: UseLazyQuery<
    QueryDefinition<
      { shopId: string; params: ApiRequest.FindManyOrders },
      any,
      any,
      ApiResponse.Orders,
      'api'
    >
  >;
}) => {
  const query = useOrders({
    status,
    lazyQuery,
  });

  const { data: orders, isRefreshing, refresh, isLoading } = query;

  return (
    <>
      <ContentData
        isRefreshing={isRefreshing}
        refresh={refresh}
        isLoading={isLoading}
        description={description}
        hasData={!!orders.length}
        ActionComponent={ActionComponent}
      >
        <OrderList query={query} />
      </ContentData>
    </>
  );
};
