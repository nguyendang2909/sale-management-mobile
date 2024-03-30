import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { ProductSettingContent } from './components/product-setting-content';
import { ProductSettingHeader } from './components/product-setting-header';

type FCProps = AppStackScreenProps<'PRODUCT_SETTING'>;

export const ProductSettingScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductSettingHeader />
      <ProductSettingContent />
    </>
  );
};
