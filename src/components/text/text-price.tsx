import { Text } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC } from 'react';
import { TextProps } from 'src/types';

import { Price } from './formatted-price';

export const TextPrice: FC<
  TextProps & {
    value?: number | null;
    variant?: 'primary' | 'secondary' | 'hightlight' | 'underline';
  }
> = ({ value, variant, ...currentTextProps }) => {
  if (_.isNil(value)) {
    return null;
  }
  const textProps = getTextProps(variant);

  return (
    <Text {...textProps} {...currentTextProps}>
      <Price value={value} />
    </Text>
  );
};

const getTextProps = (
  variant?: 'primary' | 'secondary' | 'hightlight' | 'underline',
): TextProps => {
  switch (variant) {
    case 'secondary':
      return {
        color: '$textLight900',
      };
    case 'hightlight':
      return {
        color: '$blue600',
        bold: true,
      };
    case 'underline':
      return {
        color: '$textLight600',
        textDecorationLine: 'line-through',
      };
    default:
      return {
        color: '$textLight900',
        bold: true,
      };
  }
};
