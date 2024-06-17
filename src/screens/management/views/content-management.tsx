import { RefreshControl, ScrollView } from '@gluestack-ui/themed';
import { ORDER_STATUSES } from 'src/constants';
import { useCountOrders, useSaleOverall } from 'src/hooks';
import { timeUtil } from 'src/utils';

import { CardsFeature } from './cards-feature/cards-feature';
import { OrderOverall } from './order-overall/order-overall';
import { SaleOverall } from './sale-overall/sale-overall';

export const ContentManagement = () => {
  const {
    data: saleOverall,
    refresh: refreshOverall,
    isRefreshing: isRefreshingOverall,
  } = useSaleOverall({
    startDate: timeUtil.getDate(),
    endDate: timeUtil.getDate(),
  });

  const {
    data: countUnconfirmedOrders,
    isRefreshing: isRefreshingUnconfirmedOrders,
    refresh: refreshUnconfirmedOrders,
  } = useCountOrders({
    status: ORDER_STATUSES.UNCONFIRMED,
  });

  const {
    data: countProcessingOrders,
    isRefreshing: isRefreshingProcessingOrders,
    refresh: refreshProcessingOrders,
  } = useCountOrders({
    status: ORDER_STATUSES.PROCESSING,
  });

  const isRefreshing =
    isRefreshingOverall || isRefreshingUnconfirmedOrders || isRefreshingProcessingOrders;

  const handleRefresh = () => {
    refreshOverall();
    refreshUnconfirmedOrders();
    refreshProcessingOrders();
  };

  return (
    <>
      <ScrollView
        py={16}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      >
        <SaleOverall
          overall={{
            revenue: saleOverall?.data.revenue,
            totalOrders: saleOverall?.data.totalOrders,
          }}
        />

        <OrderOverall
          mt={16}
          overall={{
            totalUnconfirmedOrders: countUnconfirmedOrders?.data.total,
            totalProcessingOrders: countProcessingOrders?.data.total,
          }}
        />

        <CardsFeature mt={16} />
      </ScrollView>
    </>
  );
};
