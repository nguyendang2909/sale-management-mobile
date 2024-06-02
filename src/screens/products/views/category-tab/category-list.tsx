import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC } from 'react';
import { AppStore, ViewProps } from 'src/types';

import { CategoryListItem } from './category-list-item';

export const CategoryList: FC<
  ViewProps & { categories: AppStore.Category[]; isRefreshing: boolean; refresh: () => void }
> = ({ categories, isRefreshing, refresh, ...viewProps }) => {
  return (
    <View {...viewProps}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={refresh}
        numColumns={1}
        data={categories}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }: { item: AppStore.Product }) => <CategoryListItem category={item} />}
        estimatedItemSize={1}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
    </View>
  );
};
