import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const ChartSaleStatistics: FC<{
  labels?: string[];
  data?: number[];
}> = ({ labels = [], data = [0, 0, 0, 0, 0, 0] }) => {
  const { width } = Dimensions.get('window');
  return (
    <View px={16}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              color: () => 'black',
              data,
            },
          ],
        }}
        width={width - 16} // from react-native
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
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            // stroke: '#ffa726',
          },
        }}
        bezier
      />
    </View>
  );
};
