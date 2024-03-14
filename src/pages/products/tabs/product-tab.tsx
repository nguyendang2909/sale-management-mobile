import { View } from '@gluestack-ui/themed';

import { ProductsFlatList } from '../product-flat-list';

export const ProductTab = () => {
  return (
    <View my={16} flex={1}>
      <ProductsFlatList />
    </View>
  );
};
