import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { ProductDetailForm } from './components/product-detail-form';
import { ProductDetailHeader } from './components/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT_DETAIL'>;

export const ProductDetailScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductDetailHeader />
      <ProductDetailForm detail={props.route.params.detail} />
    </>
  );
};
