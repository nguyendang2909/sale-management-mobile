import { RefreshControl, ScrollView, View } from '@gluestack-ui/themed';
import moment from 'moment';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TIME_FORMATS } from 'src/constants';
import { useDisclose, useInit, useSaleOverall } from 'src/hooks';
import { FormParams } from 'src/types';

import { SaleReportActionSheet } from './views/actionsheet/sale-report-actionsheet';
import { CardsSaleReports } from './views/cards/cards-sale-reports';
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

  const { data: saleOverall, isRefreshing, refresh } = useSaleOverall(dateRange);

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
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              backgroundColor: '#000',
              backgroundGradientFrom: '#000',
              backgroundGradientTo: '#000',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        </View>
      </ScrollView>

      {isInit && (
        <SaleReportActionSheet
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
