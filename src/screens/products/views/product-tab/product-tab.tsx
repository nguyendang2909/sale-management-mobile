import { View } from '@gluestack-ui/themed';

import { CreateProductFab } from '../buttons/create-product-fab';
import { ProductsFlatList } from './product-flat-list';

export const ProductTab = () => {
  return (
    <View flex={1}>
      <View flex={1}>
        <ProductsFlatList />
      </View>
      <CreateProductFab />
    </View>
  );
};
