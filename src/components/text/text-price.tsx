import { Text } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC } from 'react';
import { TextProps } from 'src/types';

import { Price } from './formatted-price';

export const TextPrice: FC<
  TextProps & {
    value?: number | null;
    variant?: 'primary' | 'secondary' | 'highlight' | 'underline' | 'default';
    showCurrency?: boolean;
  }
> = ({ value, variant, showCurrency = true, ...currentTextProps }) => {
  if (_.isNil(value)) {
    return null;
  }
  const textProps = getTextProps(variant);

  return (
    <Text numberOfLines={1} {...textProps} {...currentTextProps}>
      <Price showCurrency={showCurrency} value={value} />
    </Text>
  );
};

const getTextProps = (
  variant?: 'primary' | 'secondary' | 'highlight' | 'underline' | 'default',
): TextProps => {
  switch (variant) {
    case 'secondary':
      return {
        color: '$textLight900',
      };
    case 'highlight':
      return {
        color: '$blue600',
        bold: true,
      };
    case 'underline':
      return {
        color: '$textLight600',
        textDecorationLine: 'line-through',
      };
    case 'primary':
      return {
        color: '$textLight900',
        fontWeight: '$semibold',
      };
    default:
      return {
        color: '$textLight900',
      };
  }
};
