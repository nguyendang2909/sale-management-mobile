import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useCategories } from 'src/hooks/useCategories';
import { AppStore } from 'src/types';

import { CategoryFlatListItem } from './category-flat-list-item';

export const CategoryFlatList = () => {
  const {
    data: categories,
    isFetching: isFetchingCategories,
    refetch: refetchCategories,
  } = useCategories();

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
      ></FlashList>
    </View>
  );
};
