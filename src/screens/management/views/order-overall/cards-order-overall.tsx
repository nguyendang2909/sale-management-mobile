import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Card } from 'src/components/card/card';

export const CardsOrderOverall: FC<{
  overall: {
    totalUnconfirmedOrders?: number;
    totalProcessingOrders?: number;
  };
}> = ({ overall }) => {
  return (
    <Card p={12}>
      <HStack>
        <View flex={1} px={8}>
          <Text textAlign="center" color="$secondary400">
            Chờ xác nhận
          </Text>
          <Text textAlign="center" lineHeight={28} size="lg">
            {overall.totalUnconfirmedOrders || 0}
          </Text>
        </View>

        <View borderLeftWidth={1} borderLeftColor="$coolGray200"></View>

        <View flex={1} px={8}>
          <Text textAlign="center" color="$secondary400">
            Đang xử lý
          </Text>
          <Text textAlign="center" lineHeight={28} size="lg">
            {overall.totalProcessingOrders || 0}
          </Text>
        </View>
      </HStack>
    </Card>
  );
};
