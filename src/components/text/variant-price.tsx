import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity } from 'src/types';

import { Price } from './formatted-price';

export const ProductVariantPrice: FC<{ variant: Entity.ProductVariant }> = ({ variant }) => {
  const { promotionalPrice, price } = variant;
  return (
    <Text color="$textLight900">
      <Price value={promotionalPrice || price}></Price>
    </Text>
  );
};
