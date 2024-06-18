import { HStack, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextPrice } from 'src/components/text/text-price';
import { Entity } from 'src/types';

export const OrderItemPrices: FC<{ orderItem: Entity.OrderItem }> = ({ orderItem }) => {
  const { promotionalPrice = 0, price = 0, quantity = 0 } = orderItem;
  if (!price) {
    return null;
  }
  if (!promotionalPrice || promotionalPrice === price) {
    return (
      <Text color="$textLight900">
        <TextPrice value={price * quantity} variant="default" />
      </Text>
    );
  }

  return (
    <HStack>
      <TextPrice value={price * quantity} variant="underline" color="$textLight900" />
      <Text> </Text>
      <TextPrice value={promotionalPrice * quantity} variant="default" />
    </HStack>
  );
};
