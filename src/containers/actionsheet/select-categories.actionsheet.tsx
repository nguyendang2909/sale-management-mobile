import { ActionsheetBackdrop, ActionsheetContent, Heading, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStore } from 'src/types';

import { SelectCategoriesCheckbox } from '../select/select-categories';

type FCProps = {
  categories: AppStore.Category[];
  setCategory: (category: AppStore.Category) => void;
  value: AppStore.Category[];
};

export const SelectCategoriesActionsheetContent: FC<FCProps> = ({
  categories,
  setCategory,
  value,
}) => {
  return (
    <>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <View mb={4}>
          <Heading size="sm" textAlign="center">
            Danh mục
          </Heading>
        </View>
        <SelectCategoriesCheckbox categories={categories} setCategory={setCategory} value={value} />
      </ActionsheetContent>
    </>
  );
};
