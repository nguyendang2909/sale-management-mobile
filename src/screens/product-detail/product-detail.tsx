import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { ProductDetailForm } from './components/product-detail-form';

type FCProps = AppStackScreenProps<'PRODUCT_DETAIL'>;

export const ProductDetailScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductDetailForm detail={props.route.params.detail} />
    </>
  );
};
