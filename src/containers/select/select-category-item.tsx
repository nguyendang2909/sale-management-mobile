import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { AppStore } from 'src/types';

type FCProps = {
  category: AppStore.Category;
  onPress: (categoryId: string) => void;
  value: boolean;
};

export const SelectCategoryCheckbox: FC<FCProps> = ({ category, onPress, value }) => {
  const handlePress = useCallback(() => {
    onPress(category.id);
  }, [category.id, onPress]);

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
