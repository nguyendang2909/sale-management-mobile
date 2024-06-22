import { View } from '@gluestack-ui/themed';
import React from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentShop } from './views/content-shop';
import { HeaderShop } from './views/header/header-shop';

export const ShopScreen: React.FC<AppStackScreenProps<'SHOP'>> = () => {
  return (
    <>
      <HeaderShop />
      <View flex={1}>
        <ContentShop />
      </View>
    </>
  );
};
