import { HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header } from 'src/components';
import { IconButtonEdit, IconButtonSearch } from 'src/components/icon-button';
import { SearchInput } from 'src/components/input/search-input';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose, useInit } from 'src/hooks';
import { goBack } from 'src/navigations';
import { AppStore } from 'src/types';

import { IconButtonDeleteCategory } from './delete-category/icon-button-delete-category';
import { ModalEditCategory } from './modal/modal-edit-category';

export const HeaderCategory: FC<{
  category: AppStore.Category;
  isSearching: boolean;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  searchText: string | undefined;
  setSearchText: (e: string) => void;
}> = ({ category, isSearching, onOpenSearch, onCloseSearch, searchText, setSearchText }) => {
  const {
    isOpen: isOpenModalEditCategory,
    onOpen: onOpenModalEditCategory,
    onClose: onCloseModalEditCategory,
  } = useDisclose();

  const { isInit: isInitModalEditCategory } = useInit();

  const handleBack = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.PRODUCTS,
    });
  };

  const handleEditCategory = () => {
    onOpenModalEditCategory();
  };

  return (
    <>
      <Header
        leftText={category.title || 'Danh mục'}
        onLeftPress={handleBack}
        RightActionComponent={
          <>
            <HStack gap={16}>
              <IconButtonSearch
                isSearching={isSearching}
                onOpen={onOpenSearch}
                onClose={onCloseSearch}
              />
              <IconButtonEdit onPress={handleEditCategory} />
              <IconButtonDeleteCategory category={category} />
            </HStack>
          </>
        }
      >
        {!!isSearching && (
          <View px={16} pb={16}>
            <SearchInput
              defaultValue={searchText}
              value={searchText}
              placeholder="Tên sản phẩm"
              onChangeText={setSearchText}
            />
          </View>
        )}
      </Header>
      {isInitModalEditCategory && (
        <ModalEditCategory
          visible={isOpenModalEditCategory}
          onClose={onCloseModalEditCategory}
          category={category}
        />
      )}
    </>
  );
};
