import { FlatList, RefreshControl } from '@gluestack-ui/themed';
import { useProducts } from 'src/hooks/useProducts';
import { AppStore } from 'src/types';

import { ProductFlatListItem } from './product-flat-list-item';

export const ProductsFlatList = () => {
  const {
    data: products,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = useProducts();

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingProducts}
            onRefresh={refetchProducts}
          ></RefreshControl>
        }
        numColumns={1}
        data={products}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        keyExtractor={(item: AppStore.Product, index) => item.id || index.toString()}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderItem={({ item }: { item: AppStore.Product }) => (
          <ProductFlatListItem product={item} />
        )}
      ></FlatList>
    </>
  );
};
