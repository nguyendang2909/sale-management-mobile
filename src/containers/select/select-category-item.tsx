import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { AppStore } from 'src/types';

type FCProps = {
  category: AppStore.Category;
  setCategory: (category: AppStore.Category) => void;
  value: boolean;
};

export const SelectCategoryCheckbox: FC<FCProps> = ({ category, setCategory, value }) => {
  const handlePress = useCallback(() => {
    setCategory(category);
  }, [category, setCategory]);

  return (
    <>
      <View>
        <Button size="sm" onPress={handlePress} variant={value ? 'solid' : 'outline'}>
          <ButtonText numberOfLines={1}>{category.title}</ButtonText>
        </Button>
      </View>
    </>
  );
};
