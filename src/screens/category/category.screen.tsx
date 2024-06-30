import { Button, ButtonText, HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { LoadingOverlay, ViewFooter } from 'src/components';
import { SCREENS } from 'src/constants';
import { useDisclose, useSearchProductsByCategoryId } from 'src/hooks';
import { useCategory } from 'src/hooks/use-category';
import { navigate } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ProductList } from '../products/views/product-tab/product-list';
import { HeaderCategory } from './views/header-category';

export const CategoryScreen: FC<AppStackScreenProps<'CATEGORY'>> = ({
  route: {
    params: { detail },
  },
}) => {
  const { data: category } = useCategory({ detail });

  const {
    searchText,
    setSearchText,
    searchData: searchProducts,
    isLoading,
    isRefreshing: isRefreshingProducts,
    refresh: refreshProducts,
  } = useSearchProductsByCategoryId(
    { categoryId: detail.id },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { isOpen: isSearching, onClose: onOpenSearch, onOpen: onCloseSearch } = useDisclose();

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
      <HeaderCategory
        category={category}
        isSearching={isSearching}
        onOpenSearch={onOpenSearch}
        onCloseSearch={onCloseSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <View flex={1}>
        <LoadingOverlay isLoading={isLoading} />
        <ProductList
          mt={8}
          isRefreshing={isRefreshingProducts}
          refresh={refreshProducts}
          products={searchProducts}
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
    </>
  );
};
