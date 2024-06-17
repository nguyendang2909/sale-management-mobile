import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStore } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { Price } from './formatted-price';

export const ProductPrices: FC<{ product: AppStore.Product }> = ({ product }) => {
  if (!product.skus) {
    return <></>;
  }
  if (product.skus?.length === 1) {
    const { promotionalPrice, price } = product.skus[0];
    return (
      <Text color="$red500">
        <Price value={promotionalPrice || price}></Price>
      </Text>
    );
    // if (promotionalPrice) {
    //   return (
    //     <>
    //       <Text color="$textLight900">
    //         <FormattedNumber
    //           style="currency"
    //           currency="VND"
    //           value={_.round(promotionalPrice)}
    //         ></FormattedNumber>
    //         <Text> </Text>
    //       </Text>
    //       <Text color="$textDark600" textDecorationLine="line-through">
    //         <FormattedNumber
    //           style="currency"
    //           currency="VND"
    //           value={_.round(price)}
    //         ></FormattedNumber>
    //       </Text>
    //     </>
    //   );
    // }
  }

  const { minPrice, maxPrice } = productUtil.getPriceRange(product);

  if (minPrice === maxPrice) {
    return (
      <Text color="$textLight900">
        <Price value={minPrice}></Price>
      </Text>
    );
  }

  return (
    <Text color="$textLight900">
      <Price value={minPrice} /> - <Price value={maxPrice} />
    </Text>
  );
};
