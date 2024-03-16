import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useProducts } from 'src/hooks/use-products';
import { AppStore } from 'src/types';

import { ProductFlatListItem } from './product-flat-list-item';

export const ProductsFlatList = () => {
  const {
    data: products,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = useProducts();

  return (
    <View flex={1}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshing={isFetchingProducts}
        onRefresh={refetchProducts}
        numColumns={1}
        data={products}
        keyExtractor={(item: AppStore.Product, index) => item.id || index.toString()}
        renderItem={({ item }: { item: AppStore.Product }) => (
          <ProductFlatListItem product={item} />
        )}
        estimatedItemSize={1}
      ></FlashList>
    </View>
  );
};
