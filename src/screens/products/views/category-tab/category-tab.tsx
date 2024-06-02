import { Button, ButtonText, Fab, FabIcon, View } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { ContentData } from 'src/components/content/content-data';
import { ModalCreateCategory } from 'src/containers/modal/modal-create-category';
import { useDisclose, useSearchCategories } from 'src/hooks';

import { CategoryList } from './category-list';

export const CategoryTab = () => {
  const { data: categories, isRefreshing, refresh, isLoading } = useSearchCategories();

  const {
    isOpen: isOpenCreateCategory,
    onClose: onCloseCreateCategory,
    onOpen: onOpenCreateCategory,
  } = useDisclose();

  const handlePressAddCategory = () => {
    onOpenCreateCategory();
  };

  return (
    <View flex={1}>
      <ContentData
        isLoading={isLoading}
        description="Chưa có danh mục nào"
        refresh={refresh}
        hasData={!!categories.length}
        isRefreshing={isRefreshing}
        ActionComponent={
          <View>
            <Button size="lg" onPress={handlePressAddCategory}>
              <ButtonText>Thêm danh mục</ButtonText>
            </Button>
          </View>
        }
      >
        <CategoryList
          mt={16}
          categories={categories}
          isRefreshing={isRefreshing}
          refresh={refresh}
          flex={1}
        />
        <Fab onPress={handlePressAddCategory} bg="$blue500" size="lg" right={16} bottom={24}>
          <FabIcon as={Plus} h="$4" w="$4" />
        </Fab>
      </ContentData>
      <ModalCreateCategory onClose={onCloseCreateCategory} isVisible={isOpenCreateCategory} />
    </View>
  );
};
