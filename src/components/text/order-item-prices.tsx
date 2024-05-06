import { HStack, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity } from 'src/types';

import { Price } from './formatted-price';

export const OrderItemPrices: FC<{ orderItem: Entity.OrderItem }> = ({ orderItem }) => {
  const { promotionalPrice = 0, price = 0, quantity = 0 } = orderItem;
  if (!price) {
    return null;
  }
  if (!promotionalPrice || promotionalPrice === price) {
    return (
      <Text color="$textLight900">
        <Price value={price * quantity}></Price>
      </Text>
    );
  }

  return (
    <HStack>
      <Text color="$textLight600" textDecorationLine="line-through">
        <Price value={promotionalPrice * quantity} />{' '}
      </Text>
      <Text bold color="$textLight900">
        <Price value={price * quantity} />
      </Text>
    </HStack>
  );
};
