import { HStack, ScrollView, Text, View } from '@gluestack-ui/themed';
import moment from 'moment';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFetchSaleOverallQuery } from 'src/api';
import { Card } from 'src/components/card/card';
import { TextPrice } from 'src/components/text/text-price';
import { TIME_FORMATS } from 'src/constants';
import { useAppSelector, useDisclose, useInit } from 'src/hooks';
import { FormParams } from 'src/types';

import { SaleReportActionSheet } from './views/actionsheet/sale-report-actionsheet';
import { ButtonCalendar } from './views/form/button-calendar';
import { HeaderSaleReports } from './views/header/header-sale-reports';

export const SaleReportsScreen = () => {
  const shopId = useAppSelector(s => s.app.shop.id);
  const todayDate = moment().format(TIME_FORMATS.DATE);
  const [dateRange, setDateRange] = useState<FormParams.DateRange>({
    startDate: todayDate,
    endDate: todayDate,
  });

  const { isInit } = useInit();

  const {
    isOpen: isOpenActionsheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionsheet,
  } = useDisclose();

  const { refetch, data: saleOverall } = useFetchSaleOverallQuery({
    shopId,
    params: {
      startDate: dateRange.startDate !== todayDate ? dateRange.startDate : undefined,
      endDate: dateRange.endDate !== todayDate ? dateRange.endDate : undefined,
    },
  });

  console.log(111, saleOverall);

  return (
    <>
      <HeaderSaleReports />
      <ScrollView>
        <View mt={16} px={16}>
          <ButtonCalendar dateRange={dateRange} onPress={onOpenActionSheet} />
        </View>
        <View mt={8}>
          <HStack px={8}>
            <View w={'$1/2'} px={8} py={8}>
              <Card p={8}>
                <Text color="$secondary400">Doanh thu</Text>
                <TextPrice variant="primary" value={saleOverall?.data.revenue} />
              </Card>
            </View>
            <View w={'$1/2'} px={8} py={8}>
              <Card p={8}>
                <Text color="$secondary400">Đơn hàng</Text>
                <Text>{saleOverall?.data.totalOrders}</Text>
              </Card>
            </View>
          </HStack>
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
