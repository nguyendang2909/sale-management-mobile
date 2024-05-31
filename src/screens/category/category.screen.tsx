import { ChevronLeftIcon, HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header, LoadingOverlay } from 'src/components';
import { IconButtonEdit } from 'src/components/icon-button/icon-button-edit';
import { IconButtonSearch } from 'src/components/icon-button/icon-button-search';
import { SearchInput } from 'src/components/input/search-input';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose, useInit } from 'src/hooks';
import { useCategory } from 'src/hooks/use-category';
import { useSearchProductsByCategoryId } from 'src/hooks/use-search-product-by-category-id';
import { goBack } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ProductList } from '../products/views/product-tab/product-list';
import { CategoryEditActionsheet } from './views/actionsheet/category-edit.actionsheet';

export const CategoryScreen: FC<AppStackScreenProps<'CATEGORY'>> = ({
  route: {
    params: { detail },
  },
}) => {
  const { data: category } = useCategory({ detail });

  const {
    searchText,
    setSearchText,
    data: products,
    isLoading,
    isFetching,
    isRefreshing: isRefreshingProducts,
    refresh: refreshProducts,
  } = useSearchProductsByCategoryId({ categoryId: detail.id });

  const { isOpen: isSearching, onClose: onOpenSearch, onOpen: onCloseSearch } = useDisclose();

  const {
    isOpen: isOpenActionSheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionsheet,
  } = useDisclose();

  const { isInit: isInitActionsheet } = useInit();

  const handleEditCategory = () => {
    onOpenActionSheet();
  };

  const onBack = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.PRODUCTS,
    });
  };

  return (
    <>
      <Header
        leftText={category.title || 'Danh mục'}
        leftIcon={ChevronLeftIcon}
        onLeftPress={onBack}
        RightActionComponent={
          <>
            <HStack gap={16}>
              <IconButtonEdit onPress={handleEditCategory} />
              <IconButtonSearch
                isSearching={isSearching}
                onOpen={onOpenSearch}
                onClose={onCloseSearch}
              />
            </HStack>
          </>
        }
      >
        {!!isSearching && (
          <View px={16} pb={16}>
            <SearchInput
              defaultValue={searchText}
              value={searchText}
              placeholder="Tên danh mục"
              onChangeText={setSearchText}
            />
          </View>
        )}
      </Header>

      <View flex={1}>
        <LoadingOverlay isLoading={isLoading} />
        <ProductList
          mt={16}
          isRefreshing={isRefreshingProducts}
          refresh={refreshProducts}
          products={products}
        />
      </View>

      {isInitActionsheet && (
        <CategoryEditActionsheet
          isOpen={isOpenActionSheet}
          onClose={onCloseActionsheet}
          category={category}
        />
      )}
    </>
  );
};
