import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useSearchCategories } from 'src/hooks';
import { AppStore } from 'src/types';

import { CategoryListItem } from './category-list-item';

export const CategoryList = () => {
  const { data: categories, isRefreshing, refresh } = useSearchCategories();

  return (
    <View flex={1}>
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
