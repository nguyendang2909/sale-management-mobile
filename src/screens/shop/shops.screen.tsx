import React from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { HeaderShop } from './views/header/header-shop';

export const ShopScreen: React.FC<AppStackScreenProps<'SHOP'>> = () => {
  return (
    <>
      <HeaderShop />
    </>
  );
};
