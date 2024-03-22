import { View } from '@gluestack-ui/themed';

import { CreateCategoryFab } from '../buttons/create-category-fb';
import { CategoryFlatList } from './category-flat-list';

export const CategoryTab = () => {
  return (
    <View flex={1}>
      <View mt={16} flex={1}>
        <CategoryFlatList />
      </View>
      <CreateCategoryFab />
    </View>
  );
};
