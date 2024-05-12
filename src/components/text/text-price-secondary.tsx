import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';

import { Price } from './formatted-price';

export const TextPricePrimary: FC<{ value?: number }> = ({ value }) => {
  return (
    <Text color="$textLight900">
      <Price value={value}></Price>
    </Text>
  );
};
