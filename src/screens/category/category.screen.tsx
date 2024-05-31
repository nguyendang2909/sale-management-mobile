import { ChevronLeftIcon, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header, LoadingOverlay } from 'src/components';
import { IconButtonSearch } from 'src/components/icon-button/icon-button-search';
import { SearchInput } from 'src/components/input/search-input';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { useCategory } from 'src/hooks/use-category';
import { useSearchProductsByCategoryId } from 'src/hooks/use-search-product-by-category-id';
import { goBack } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ProductList } from '../products/views/product-tab/product-list';

export const CategoryScreen: FC<AppStackScreenProps<'CATEGORY'>> = ({
  route: {
    params: { detail },
  },
}) => {
  const onBack = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.PRODUCTS,
    });
  };
  const category = useCategory({ detail });
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

  return (
    <>
      <Header
        title="Danh mục"
        leftIcon={ChevronLeftIcon}
        onLeftPress={onBack}
        RightActionComponent={
          <>
            <View pr={8}>
              <View
                justifyContent="flex-end"
                alignItems="center"
                flexDirection="row"
                columnGap={8}
                rowGap={8}
              >
                <IconButtonSearch
                  isSearching={isSearching}
                  onOpen={onOpenSearch}
                  onClose={onCloseSearch}
                />
              </View>
            </View>
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
    </>
  );
};
