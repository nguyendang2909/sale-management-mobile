import { Fab, FabIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import { SCREENS } from 'src/constants';

export const CreateProductFab = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.PRODUCT_CREATE);
  };

  return (
    <>
      <Fab onPress={handlePress} bg="$blue500" size="lg" right={16} bottom={24}>
        <FabIcon as={Plus} h="$4" w="$4" />
      </Fab>
    </>
  );
};
