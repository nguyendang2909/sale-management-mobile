import { Text } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC } from 'react';
import { FormattedNumber } from 'react-intl';
import { AppStore } from 'src/types';

export const ProductPrices: FC<{ product: AppStore.Product }> = ({ product }) => {
  const { price, promotionalPrice } = product;

  if (!price) {
    return;
  }

  if (promotionalPrice) {
    return (
      <>
        <Text color="$textLight900">
          <FormattedNumber
            style="currency"
            currency="VND"
            value={_.round(promotionalPrice)}
          ></FormattedNumber>
          <Text> </Text>
        </Text>
        <Text color="$textDark600" textDecorationLine="line-through">
          <FormattedNumber style="currency" currency="VND" value={_.round(price)}></FormattedNumber>
        </Text>
      </>
    );
  }

  return (
    <Text color="$textLight900">
      <FormattedNumber style="currency" currency="VND" value={_.round(price)}></FormattedNumber>
    </Text>
  );
};
