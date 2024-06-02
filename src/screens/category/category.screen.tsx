import { Button, ButtonText, ChevronLeftIcon, HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header, LoadingOverlay, ViewFooter } from 'src/components';
import { IconButtonEdit } from 'src/components/icon-button/icon-button-edit';
import { IconButtonSearch } from 'src/components/icon-button/icon-button-search';
import { SearchInput } from 'src/components/input/search-input';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose, useInit } from 'src/hooks';
import { useCategory } from 'src/hooks/use-category';
import { useSearchProductsByCategoryId } from 'src/hooks/use-search-product-by-category-id';
import { goBack, navigate } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ProductList } from '../products/views/product-tab/product-list';
import { CategoryEditActionsheet } from './views/actionsheet/category-edit.actionsheet';
import { IconButtonDeleteCategory } from './views/delete-category/icon-button-delete-category';

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

  const handlePressDeleteProducts = () => {
    navigate(SCREENS.CATEGORY_DELETE_PRODUCTS, { detail: category });
  };

  const handlePressAddProducts = () => {
    navigate(SCREENS.CATEGORY_ADD_PRODUCTS, {
      detail: category,
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
        <ViewFooter px={16} py={16} bgColor="$white">
          <View>
            <HStack gap={16}>
              <View flex={1}>
                <Button variant="outline" onPress={handlePressDeleteProducts}>
                  <ButtonText>Xoá sản phẩm</ButtonText>
                </Button>
              </View>
              <View flex={1}>
                <Button onPress={handlePressAddProducts}>
                  <ButtonText>Thêm sản phẩm</ButtonText>
                </Button>
              </View>
            </HStack>
          </View>
        </ViewFooter>
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
