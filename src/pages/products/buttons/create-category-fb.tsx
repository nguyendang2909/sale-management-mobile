import { Fab, FabIcon } from '@gluestack-ui/themed';
import { FontAwesome } from 'src/components';
import { CreateCategoryModal } from 'src/containers/Modal/create-category-modal';
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
        {/*
          @ts-ignore */}
        <FabIcon as={FontAwesome} name="plus" h="$4" w="$4" />
      </Fab>

      <CreateCategoryModal onClose={onCloseCreateCategory} isVisible={isOpenCreateCategory} />
    </>
  );
};
