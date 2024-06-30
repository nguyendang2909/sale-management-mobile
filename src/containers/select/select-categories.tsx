import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStore } from 'src/types';

import { SelectCategoryCheckbox } from './select-category-item';

type FCProps = {
  categories: AppStore.Category[];
  onPress: (categoryId: string) => void;
  value: string[];
};

export const SelectCategoriesCheckbox: FC<FCProps> = ({ categories, value, onPress }) => {
  return (
    <View
      flexDirection="row"
      columnGap={8}
      rowGap={8}
      //  flexWrap="wrap"
    >
      {categories.map(category => {
        return (
          <SelectCategoryCheckbox
            key={category.id}
            category={category}
            onPress={onPress}
            value={!!value.find(e => e === category.id)}
          />
        );
      })}
    </View>
  );
};
