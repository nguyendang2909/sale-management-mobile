import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { ProductDetailForm } from './components/product-detail-form';
import { ProductDetailHeader } from './components/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT'>;

export const ProductScreen: FC<FCProps> = props => {
  console.log(222);
  return (
    <>
      <ProductDetailHeader />
      <ProductDetailForm detail={props.route.params.detail} />
    </>
  );
};
