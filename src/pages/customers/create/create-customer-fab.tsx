import { Fab, FabIcon, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import { Modal } from 'react-native';
import { CreateCustomerModal } from 'src/containers/Modal/create-customer-modal';
import { useDisclose } from 'src/hooks';

export const CreateCustomerFab = () => {
  const navigation = useNavigation();

  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclose();

  const handlePress = () => {
    onOpenCreateModal();
    // navigation.navigate(SCREENS.CREATE_PRODUCT);
  };

  return (
    <>
      <Fab onPress={handlePress} bg="$blue500" size="lg" right={16} bottom={24}>
        <FabIcon as={Plus} h="$4" w="$4" />
      </Fab>

      <Modal animationType="slide" visible={isOpenCreateModal}>
        <View flex={1}>
          <CreateCustomerModal onClose={onCloseCreateModal} />
        </View>
      </Modal>
    </>
  );
};
