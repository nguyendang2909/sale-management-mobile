import { Fab, FabIcon } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { ModalCreateCategory } from 'src/containers/modal/modal-create-category';
import { useDisclose } from 'src/hooks';

export const CreateCategoryFab = () => {
  const {
    isOpen: isOpenCreateCategory,
    onClose: onCloseCreateCategory,
    onOpen: onOpenCreateCategory,
  } = useDisclose();

  const handlePress = () => {
    onOpenCreateCategory();
  };

  return (
    <>
      <Fab onPress={handlePress} bg="$blue500" size="lg" right={16} bottom={24}>
        <FabIcon as={Plus} h="$4" w="$4" />
      </Fab>

      <ModalCreateCategory onClose={onCloseCreateCategory} isVisible={isOpenCreateCategory} />
    </>
  );
};
