import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  View,
} from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Header } from 'src/components';
import { ButtonTag } from 'src/components/button/button-tag';
import {
  HOME_SCREENS,
  SALE_STATISTIC_TIME_RANGE_IDS_MAP,
  SALE_STATISTICS_RANGES,
  SCREENS,
} from 'src/constants';
import { useDisclose } from 'src/hooks';
import { goBack } from 'src/navigations';
import { SaleStatisticTimeRangeId } from 'src/types';

export const SaleReportsScreen = () => {
  const [selectedTimeRangeId, setSelectRangeTimeId] = useState<SaleStatisticTimeRangeId>(
    SALE_STATISTIC_TIME_RANGE_IDS_MAP.TODAY,
  );

  console.log(111, selectedTimeRangeId);

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
        {/* <Button onPress={onOpenActionSheet}>
          <ButtonText>{SALE_STATISTICS_RANGES_MAP[selectedTimeRangeId].title}</ButtonText>
        </Button> */}
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

      <Actionsheet isOpen={isOpenActionsheet} onClose={onCloseActionsheet} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View>
            {SALE_STATISTICS_RANGES.map(item => {
              return (
                <ButtonTag
                  key={item.id}
                  title={item.title}
                  value={item.id}
                  onChange={setSelectRangeTimeId}
                  isEnabled={item.id === selectedTimeRangeId}
                ></ButtonTag>
              );
            })}
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};
