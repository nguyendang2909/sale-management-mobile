import { Fab, FabIcon } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { CreateCategoryModal } from 'src/containers/modal/create-category.modal';
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

      <CreateCategoryModal onClose={onCloseCreateCategory} isVisible={isOpenCreateCategory} />
    </>
  );
};
