import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { Calendar, ChevronLeft } from 'lucide-react-native';
import moment from 'moment';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS, TIME_FORMATS } from 'src/constants';
import { useDisclose, useInit } from 'src/hooks';
import { goBack } from 'src/navigations';
import { FormParams } from 'src/types';

import { SaleReportActionSheet } from './views/actionsheet/sale-report-actionsheet';

export const SaleReportsScreen = () => {
  const [dateRange, setDateRange] = useState<FormParams.DateRange>({
    startDate: moment().format(TIME_FORMATS.DATE),
    endDate: moment().format(TIME_FORMATS.DATE),
  });

  const { isInit } = useInit();

  const {
    isOpen: isOpenActionsheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionsheet,
  } = useDisclose();

  const handlePressCalendar = () => {};

  return (
    <>
      <Header
        title="Báo cáo bán hàng"
        onLeftPress={() => {
          goBack(SCREENS.HOME, {
            screen: HOME_SCREENS.REPORTS,
          });
        }}
        leftIcon={ChevronLeft}
      />
      <View mt={16} px={16}>
        <Button onPress={onOpenActionSheet} variant="outline">
          <ButtonIcon as={Calendar} mr={8}></ButtonIcon>
          <ButtonText>Hom nay</ButtonText>
        </Button>
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
