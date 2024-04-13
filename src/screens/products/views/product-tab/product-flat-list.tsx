import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useSearchProducts } from 'src/hooks';
import { useProducts } from 'src/hooks/use-products';
import { AppStore } from 'src/types';

import { ProductFlatListItem } from './product-flat-list-item';

export const ProductsFlatList = () => {
  const { isFetching: isFetchingProducts, refetch: refetchProducts } = useProducts();
  const { data: products } = useSearchProducts();

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
        ListFooterComponent={<View mb={100}></View>}
      ></FlashList>
    </View>
  );
};
