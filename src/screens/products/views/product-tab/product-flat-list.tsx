import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { useAppSelector } from 'src/hooks';
import { useProducts } from 'src/hooks/use-products';
import { AppStore } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { ProductFlatListItem } from './product-flat-list-item';

export const ProductsFlatList = () => {
  const { data, isFetching: isFetchingProducts, refetch: refetchProducts } = useProducts();
  const searchText = useAppSelector(s => s.cache.product.searchText);
  const sortBy = useAppSelector(s => s.cache.product.sortType);

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

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
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
    </View>
  );
};
