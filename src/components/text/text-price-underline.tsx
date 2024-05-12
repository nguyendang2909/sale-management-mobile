import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';

import { Price } from './formatted-price';

export const TextPriceUnderline: FC<{ value?: number }> = ({ value }) => {
  return (
    <Text color="$textLight600" textDecorationLine="line-through">
      <Price value={value}></Price>
    </Text>
  );
};
