import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity } from 'src/types';

import { Price } from './formatted-price';

export const SkuPrice: FC<{ sku: Entity.Sku }> = ({ sku }) => {
  const { promotionalPrice, price } = sku;
  return (
    <Text color="$textLight900">
      <Price value={promotionalPrice || price}></Price>
    </Text>
  );
};
