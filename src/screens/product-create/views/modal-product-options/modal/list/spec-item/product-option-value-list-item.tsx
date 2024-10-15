import { Button, ButtonIcon, ButtonText, CloseCircleIcon, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

export const ProductOptionValueListItem: FC<{
  productOptionValue: string;
  onDelete: (value: string) => void;
  onPress: (value: string) => void;
}> = ({ productOptionValue, onDelete, onPress }) => {
  const handleDelete = useCallback(() => {
    onDelete(productOptionValue);
  }, [onDelete, productOptionValue]);

  const handlePress = useCallback(() => {
    onPress(productOptionValue);
  }, [onPress, productOptionValue]);

  return (
    <View>
      <Button variant="outline" size="xs" onPress={handlePress}>
        <ButtonText>{productOptionValue}</ButtonText>
        <View
          as={TouchableOpacity}
          p={4}
          // @ts-ignore
          onPress={handleDelete}
        >
          <ButtonIcon ml={16} as={CloseCircleIcon}></ButtonIcon>
        </View>
      </Button>
    </View>
  );
};
