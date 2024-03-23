import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { useAppSelector } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { AppStore } from 'src/types';
import { categoryUtil } from 'src/utils/category.util';

import { CategoryFlatListItem } from './category-flat-list-item';

export const CategoryFlatList = () => {
  const { data, isFetching: isFetchingCategories, refetch: refetchCategories } = useCategories();
  const searchText = useAppSelector(s => s.cache.category.searchText);

  const categories = useMemo(() => categoryUtil.filter(data, { searchText }), [data, searchText]);

  return (
    <View flex={1}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshing={isFetchingCategories}
        onRefresh={refetchCategories}
        numColumns={1}
        data={categories}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }: { item: AppStore.Product }) => (
          <CategoryFlatListItem category={item} />
        )}
        estimatedItemSize={1}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
    </View>
  );
};
