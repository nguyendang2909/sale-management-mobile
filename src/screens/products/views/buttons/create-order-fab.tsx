import { Fab, FabIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import { SCREENS } from 'src/constants';
import { createOrderFormUtil } from 'src/utils';

export const CreateOrderFab = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.ORDER_CREATE, {
      values: createOrderFormUtil.getDefaultValues(),
    });
  };

  return (
    <>
      <Fab onPress={handlePress} bg="$blue500" size="lg" right={16} bottom={24}>
        <FabIcon as={Plus} h="$4" w="$4" />
      </Fab>
    </>
  );
};
