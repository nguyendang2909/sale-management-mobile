import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { FC } from 'react';
import { Card } from 'src/components';
import { TextPrice } from 'src/components/text/text-price';

export const CashItemOverallSection: FC<{
  incomeAmount: number;
  expenditureAmount: number;
  cashAmount: number;
}> = ({ incomeAmount, expenditureAmount, cashAmount }) => {
  return (
    <View>
      <HStack mt={24}>
        <Text fontWeight="$semibold">Số dư: </Text>
        <TextPrice variant="primary" color="$success600" value={cashAmount} />
      </HStack>
      <View flexDirection="row" gap={16} mt={8}>
        <View flex={1}>
          <Card p={8}>
            <HStack gap={8} justifyContent="center" alignItems="center">
              <View>
                <Icon as={ArrowDown} color="$success600" />
              </View>
              <View flexGrow={1}>
                <Text color="$secondary500" fontSize="$sm" numberOfLines={1}>
                  Tổng thu
                </Text>
                <TextPrice variant="primary" color="$success600" value={incomeAmount}></TextPrice>
              </View>
            </HStack>
          </Card>
        </View>
        <View flex={1}>
          <Card p={8}>
            <HStack gap={8} justifyContent="center" alignItems="center">
              <View>
                <Icon as={ArrowUp} color="$warning600" />
              </View>
              <View flexGrow={1}>
                <Text color="$secondary500" fontSize="$sm" numberOfLines={1}>
                  Tổng chi
                </Text>
                <TextPrice variant="primary" color="$warning600" value={incomeAmount}></TextPrice>
              </View>
            </HStack>
          </Card>
        </View>
      </View>
    </View>
  );
};
