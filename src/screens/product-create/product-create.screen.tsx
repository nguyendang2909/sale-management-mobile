import { View } from '@gluestack-ui/themed';
import { ContentProductCreate } from 'src/screens/product-create/views/content-product-create';

import { HeaderProductCreate } from './views/header-product-create';

export const ProductCreateScreen = () => {
  return (
    <>
      <HeaderProductCreate />
      <View flex={1}>
        <ContentProductCreate />
      </View>
    </>
  );
};
