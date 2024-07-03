import { Button, ButtonIcon, ButtonText, CloseCircleIcon, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { FormParams } from 'src/types';

export const SpecificationListItem: FC<{
  specification: FormParams.CreateProductSpecification;
  onDelete: (id: string) => void;
  onPress: (specification: FormParams.CreateProductSpecification) => void;
}> = ({ specification, onDelete, onPress }) => {
  const handleDelete = useCallback(() => {
    onDelete(specification.id);
  }, [onDelete, specification.id]);

  const handlePress = useCallback(() => {
    onPress(specification);
  }, [onPress, specification]);

  return (
    <View>
      <Button variant="outline" size="xs" onPress={handlePress}>
        <ButtonText>{specification.title}</ButtonText>
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
