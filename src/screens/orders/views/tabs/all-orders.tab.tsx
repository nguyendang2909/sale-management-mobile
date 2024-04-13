import { View } from '@gluestack-ui/themed';
import { CreateProductFab } from 'src/screens/products/views/buttons/create-product-fab';
import { ProductsFlatList } from 'src/screens/products/views/product-tab/product-flat-list';

export const AllOrdersTab = () => {
  return (
    <View flex={1}>
      <View flex={1} mt={16}>
        <ProductsFlatList />
      </View>
      <CreateProductFab />
    </View>
  );
};
