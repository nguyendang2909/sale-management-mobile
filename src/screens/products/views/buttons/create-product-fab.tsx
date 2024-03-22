import { Fab, FabIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'src/components';
import { SCREENS } from 'src/constants';

export const CreateProductFab = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.CREATE_PRODUCT);
  };

  return (
    <>
      <Fab onPress={handlePress} bg="$blue500" size="lg" right={16} bottom={24}>
        {/*
          @ts-ignore */}
        <FabIcon as={FontAwesome} name="plus" h="$4" w="$4" />
      </Fab>
    </>
  );
};
