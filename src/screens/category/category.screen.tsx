import { ChevronLeftIcon, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC } from 'react';
import { Header } from 'src/components';
import { IconButtonSearch } from 'src/components/icon-button/icon-button-search';
import { SearchInput } from 'src/components/input/search-input';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { useCategory } from 'src/hooks/use-category';
import { useSearchProductsByCategoryId } from 'src/hooks/use-search-product-by-category-id';
import { goBack } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ProductListItem } from '../products/views/product-tab/product-list-item';

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
        <FlashList
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshingProducts}
          onRefresh={refreshProducts}
          numColumns={1}
          data={products}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => <ProductListItem product={item} />}
          estimatedItemSize={1}
          ListFooterComponent={<View height={100}></View>}
        ></FlashList>
      </View>
    </>
  );
};
