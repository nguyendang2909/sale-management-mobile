import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ProductContent } from './views/product-content';
import { ProductDetailHeader } from './views/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT'>;

export const ProductScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductDetailHeader />
      <ProductContent detail={props.route.params.detail} />
    </>
  );
};
