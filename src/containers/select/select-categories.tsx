import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStore } from 'src/types';

import { SelectCategoryCheckbox } from './select-category-item';

type FCProps = {
  categories: AppStore.Category[];
  setCategory: (category: AppStore.Category) => void;
  value: AppStore.Category[];
};

export const SelectCategoriesCheckbox: FC<FCProps> = ({ categories, value, setCategory }) => {
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
            setCategory={setCategory}
            value={!!value.find(e => e.id === category.id)}
          />
        );
      })}
    </View>
  );
};
