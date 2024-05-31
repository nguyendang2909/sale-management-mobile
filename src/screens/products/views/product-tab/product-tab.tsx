import { View } from '@gluestack-ui/themed';
import { useSearchProducts } from 'src/hooks';

import { CreateProductFab } from '../buttons/create-product-fab';
import { ProductList } from './product-list';

export const ProductTab = () => {
  const { data: products, refresh, isRefreshing } = useSearchProducts();
  return (
    <View flex={1}>
      <View flex={1} mt={16}>
        <ProductList products={products} isRefreshing={isRefreshing} refresh={refresh} />
      </View>
      <CreateProductFab />
    </View>
  );
};
