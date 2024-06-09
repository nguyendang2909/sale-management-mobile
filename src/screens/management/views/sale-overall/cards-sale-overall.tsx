import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Card } from 'src/components/card/card';
import { TextPrice } from 'src/components/text/text-price';

export const CardsSaleOverall: FC<{
  revenue?: number;
  totalOrders?: number;
  isShow?: boolean;
}> = ({ revenue = 0, totalOrders = 0, isShow }) => {
  return (
    <HStack px={8}>
      <View w={'$1/2'} px={8} py={8}>
        <Card p={12}>
          <Text color="$secondary400">Doanh thu</Text>
          {isShow ? (
            <TextPrice size="lg" variant="primary" value={revenue} lineHeight={28} />
          ) : (
            <Text lineHeight={28}>******</Text>
          )}
        </Card>
      </View>
      <View w={'$1/2'} px={8} py={8}>
        <Card p={12}>
          <Text color="$secondary400">Đơn hàng</Text>
          {isShow ? (
            <Text lineHeight={28} size="lg">
              {totalOrders}
            </Text>
          ) : (
            <Text lineHeight={28}>******</Text>
          )}
        </Card>
      </View>
    </HStack>
  );
};
