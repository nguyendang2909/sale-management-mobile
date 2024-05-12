import { HStack, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity } from 'src/types';

import { TextPricePrimary } from './text-price-primary';
import { TextPriceUnderline } from './text-price-underline';

export const OrderItemPrices: FC<{ orderItem: Entity.OrderItem }> = ({ orderItem }) => {
  const { promotionalPrice = 0, price = 0, quantity = 0 } = orderItem;
  if (!price) {
    return null;
  }
  if (!promotionalPrice || promotionalPrice === price) {
    return (
      <Text color="$textLight900">
        <TextPricePrimary value={price * quantity} />
      </Text>
    );
  }

  return (
    <HStack>
      <TextPriceUnderline value={price * quantity} />
      <Text> </Text>
      <TextPricePrimary value={promotionalPrice * quantity} />
    </HStack>
  );
};
