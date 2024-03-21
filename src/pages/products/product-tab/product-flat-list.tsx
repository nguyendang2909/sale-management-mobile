import {
  CloseIcon,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  Pressable,
  SearchIcon,
  View,
} from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { SortAscIcon } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { SearchInput } from 'src/components/input/search-input';
import { PRODUCT_SORT_TYPE_DATA } from 'src/constants';
import { PRODUCT_SORT_TYPES } from 'src/constants/constants';
import { useDisclose } from 'src/hooks';
import { useProducts } from 'src/hooks/use-products';
import { AppStore, ProductSortType } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { ProductFlatListItem } from './product-flat-list-item';

export const ProductsFlatList = () => {
  const { data, isFetching: isFetchingProducts, refetch: refetchProducts } = useProducts();

  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<ProductSortType>(PRODUCT_SORT_TYPES.CUSTOM);

  const { isOpen: isSearching, onOpen: onOpenSearching, onClose: onCloseSearching } = useDisclose();

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  const handleOpenSearch = useCallback(() => {
    onOpenSearching();
  }, [onOpenSearching]);

  const handleCloseSearch = useCallback(() => {
    onCloseSearching();
    setSearchText('');
  }, [onCloseSearching]);

  return (
    <View flex={1}>
      <View px={16} py={16}>
        <View
          justifyContent="flex-end"
          alignItems="center"
          flexDirection="row"
          columnGap={8}
          rowGap={8}
        >
          <Menu
            placement="bottom left"
            trigger={({ ...triggerProps }) => {
              return (
                <Pressable {...triggerProps}>
                  <Icon as={SortAscIcon} color="$coolGray500" />
                </Pressable>
              );
            }}
          >
            {PRODUCT_SORT_TYPE_DATA.map((e, index) => {
              return (
                <MenuItem
                  key={e.id || index.toString()}
                  textValue={e.type}
                  onPress={() => {
                    setSortBy(e.type);
                  }}
                >
                  <MenuItemLabel size="sm">{e.title}</MenuItemLabel>
                </MenuItem>
              );
            })}
          </Menu>

          {isSearching ? (
            <Pressable onPress={handleCloseSearch}>
              <Icon as={CloseIcon} size="xl" color="$coolGray500" />
            </Pressable>
          ) : (
            <Pressable onPress={handleOpenSearch}>
              {isSearching ? <Icon as={CloseIcon} size="xl" /> : <Icon as={SearchIcon} size="xl" />}
            </Pressable>
          )}
        </View>
        <View mt={16}>
          <SearchInput onChangeText={setSearchText} />
        </View>
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        refreshing={isFetchingProducts}
        onRefresh={refetchProducts}
        numColumns={1}
        data={products}
        keyExtractor={(item: AppStore.Product, index) => item.id || index.toString()}
        renderItem={({ item }: { item: AppStore.Product }) => (
          <ProductFlatListItem product={item} />
        )}
        estimatedItemSize={1}
      ></FlashList>
    </View>
  );
};
