import { View } from '@gluestack-ui/themed';

import { CreateProductFab } from '../buttons/create-product-fab';
import { ProductList } from './product-list';

export const ProductTab = () => {
  return (
    <View flex={1}>
      <View flex={1} mt={16}>
        <ProductList />
      </View>
      <CreateProductFab />
    </View>
  );
};
