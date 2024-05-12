import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { ProductContent } from './components/product-content';
import { ProductDetailHeader } from './components/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT'>;

export const ProductScreen: FC<FCProps> = props => {
  console.log(222);
  return (
    <>
      <ProductDetailHeader />
      <ProductContent detail={props.route.params.detail} />
    </>
  );
};
