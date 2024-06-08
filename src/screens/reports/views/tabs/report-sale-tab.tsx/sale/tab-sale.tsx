import { Button, ButtonGroup, ButtonText, HStack, Icon, View } from '@gluestack-ui/themed';
import { Calendar } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SALE_STATISTICS_RANGES } from 'src/constants';

export const TabSale = () => {
  const [selectedRange, setRange] = useState<string>();

  const handlePressCalendar = () => {};

  return (
    <>
      <View mt={16} px={16}>
        <HStack alignItems="center" gap={16}>
          <TouchableOpacity onPress={handlePressCalendar}>
            <Icon as={Calendar} size="xl" />
          </TouchableOpacity>
          <View>
            <ButtonGroup size="xs" isAttached>
              {SALE_STATISTICS_RANGES.map(item => {
                const handlePress = () => {
                  setRange(item.id);
                };
                return (
                  <Button
                    key={item.id}
                    variant={selectedRange === item.id ? 'solid' : 'outline'}
                    onPress={handlePress}
                  >
                    <ButtonText>{item.title}</ButtonText>
                  </Button>
                );
              })}
            </ButtonGroup>
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
    </>
  );
};
