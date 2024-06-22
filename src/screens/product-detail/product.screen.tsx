import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentProduct } from './views/content-product';
import { ProductDetailHeader } from './views/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT'>;

export const ProductScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductDetailHeader />
      <ContentProduct detail={props.route.params.detail} />
    </>
  );
};
