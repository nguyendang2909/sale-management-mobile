import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useSearchProducts } from 'src/hooks';
import { useProducts } from 'src/hooks/use-products';
import { AppStore } from 'src/types';

import { ProductListItem } from './product-list-item';

export const ProductList = () => {
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
        renderItem={({ item }: { item: AppStore.Product }) => <ProductListItem product={item} />}
        estimatedItemSize={1}
        ListFooterComponent={<View mb={100}></View>}
      ></FlashList>
    </View>
  );
};
