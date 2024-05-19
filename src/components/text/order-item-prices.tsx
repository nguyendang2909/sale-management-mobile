import { HStack, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity } from 'src/types';

import { TextPrice } from './text-price';

export const OrderItemPrices: FC<{ orderItem: Entity.OrderItem }> = ({ orderItem }) => {
  const { promotionalPrice = 0, price = 0, quantity = 0 } = orderItem;
  if (!price) {
    return null;
  }
  if (!promotionalPrice || promotionalPrice === price) {
    return (
      <Text color="$textLight900">
        <TextPrice value={price * quantity} variant="primary" />
      </Text>
    );
  }

  return (
    <HStack>
      <TextPrice value={price * quantity} variant="underline" />
      <Text> </Text>
      <TextPrice value={promotionalPrice * quantity} variant="primary" />
    </HStack>
  );
};
