import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity } from 'src/types';

import { OrderItemPrices } from './price/order-item-prices';

export const InvoiceOrderItem: FC<{ item: Entity.OrderItem; index: number }> = ({
  item,
  index,
}) => {
  return (
    <HStack mt={16}>
      <View flex={1}>
        <Text>
          {index + 1}. {item.title}
        </Text>
        <OrderItemPrices orderItem={item} />
      </View>
      <View minWidth={30}>
        <Text>SL</Text>
      </View>
      <View minWidth={70}>
        <Text textAlign="right">T.Tiền</Text>
      </View>
    </HStack>
  );
};
