import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC } from 'react';
import { AppStore, ViewProps } from 'src/types';

import { ProductListItem } from './product-list-item';

export const ProductList: FC<
  ViewProps & {
    products: AppStore.Product[];
    isRefreshing: boolean;
    refresh: () => void;
  }
> = ({ products, isRefreshing, refresh, ...viewProps }) => {
  return (
    <View flex={1} {...viewProps}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={refresh}
        numColumns={1}
        data={products}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        estimatedItemSize={1}
        ListFooterComponent={<View mb={100}></View>}
      ></FlashList>
    </View>
  );
};
