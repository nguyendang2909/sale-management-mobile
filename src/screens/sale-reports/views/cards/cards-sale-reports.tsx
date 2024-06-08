import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Card } from 'src/components/card/card';
import { TextPrice } from 'src/components/text/text-price';

export const CardsSaleReports: FC<{
  revenue?: number;
  totalOrders?: number;
}> = ({ revenue = 0, totalOrders = 0 }) => {
  return (
    <HStack px={8}>
      <View w={'$1/2'} px={8} py={8}>
        <Card p={12}>
          <Text color="$secondary400">Doanh thu</Text>
          <TextPrice size="lg" variant="primary" value={revenue} />
        </Card>
      </View>
      <View w={'$1/2'} px={8} py={8}>
        <Card p={12}>
          <Text color="$secondary400">Đơn hàng</Text>
          <Text size="lg">{totalOrders}</Text>
        </Card>
      </View>
    </HStack>
  );
};
