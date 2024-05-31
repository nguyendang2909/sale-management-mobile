import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main-stack';

import { ProductContent } from './components/product-content';
import { ProductDetailHeader } from './components/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT'>;

export const ProductScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductDetailHeader />
      <ProductContent detail={props.route.params.detail} />
    </>
  );
};
