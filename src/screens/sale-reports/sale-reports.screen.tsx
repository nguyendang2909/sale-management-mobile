import { RefreshControl, ScrollView, View } from '@gluestack-ui/themed';
import moment from 'moment';
import { useState } from 'react';
import { ActionsheetDateRange } from 'src/components';
import { TIME_FORMATS } from 'src/constants';
import { useDisclose, useInit, useSaleOverall, useSaleStatistics } from 'src/hooks';
import { FormParams } from 'src/types';

import { CardsSaleReports } from './views/cards/cards-sale-reports';
import { ChartSaleStatistics } from './views/chart/chart-sale-statistics';
import { ButtonCalendar } from './views/form/button-calendar';
import { HeaderSaleReports } from './views/header/header-sale-reports';

export const SaleReportsScreen = () => {
  const [dateRange, setDateRange] = useState<FormParams.DateRange>({
    startDate: moment().startOf('month').format(TIME_FORMATS.DATE),
    endDate: moment().endOf('month').format(TIME_FORMATS.DATE),
  });

  const { isInit } = useInit();

  const {
    isOpen: isOpenActionsheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionsheet,
  } = useDisclose();

  const {
    data: saleOverall,
    isRefreshing: isRefreshingSaleOverall,
    refresh: refreshSaleOverall,
  } = useSaleOverall(dateRange);

  const {
    data: saleStatistics,
    isRefreshing: isRefreshingSaleStatistics,
    refresh: refreshSaleStatistics,
  } = useSaleStatistics(dateRange);

  const isRefreshing = isRefreshingSaleOverall || isRefreshingSaleStatistics;

  const refresh = () => {
    refreshSaleOverall();
    refreshSaleStatistics();
  };

  // console.log(111222, saleStatistics);

  return (
    <>
      <HeaderSaleReports />
      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}>
        <View mt={16} px={16}>
          <ButtonCalendar dateRange={dateRange} onPress={onOpenActionSheet} />
        </View>
        <View mt={8}>
          <CardsSaleReports
            revenue={saleOverall?.data.revenue}
            totalOrders={saleOverall?.data.totalOrders}
          />
        </View>
        <View mt={16}>
          <ChartSaleStatistics
            labels={
              saleStatistics?.data.map(e => {
                return moment(e.interval, TIME_FORMATS.DATE).format('DD/MM');
              }) || []
            }
            data={saleStatistics?.data.map(e => e.revenue!)}
          />
        </View>
      </ScrollView>

      {isInit && (
        <ActionsheetDateRange
          isOpen={isOpenActionsheet}
          onClose={onCloseActionsheet}
          onOpen={onOpenActionSheet}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}
    </>
  );
};
