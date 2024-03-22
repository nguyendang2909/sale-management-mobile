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
import { SortAscIcon } from 'lucide-react-native';
import { useCallback } from 'react';
import { Header } from 'src/components';
import { SearchInput } from 'src/components/input/search-input';
import { PRODUCT_SORT_TYPE_DATA } from 'src/constants';
import { useAppDispatch, useDisclose } from 'src/hooks';
import { setProductSearchText, setProductSortType } from 'src/store/cache';
import { ProductSortType } from 'src/types';

export const ProductTabHeader = () => {
  const dispatch = useAppDispatch();
  //   const searchText = useAppSelector(s => s.cache.product.searchText);
  const { isOpen: isSearching, onOpen: onOpenSearching, onClose: onCloseSearching } = useDisclose();

  const handleOpenSearch = useCallback(() => {
    onOpenSearching();
  }, [onOpenSearching]);

  const handleCloseSearch = useCallback(() => {
    onCloseSearching();
    dispatch(setProductSearchText(''));
  }, [dispatch, onCloseSearching]);

  const handleChangeText = (e: string) => {
    dispatch(setProductSearchText(e));
  };

  const handleChangeSortType = (e: ProductSortType) => {
    dispatch(setProductSortType(e));
  };

  return (
    <>
      <Header
        leftText="Sản phẩm"
        RightActionComponent={
          <>
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
                          handleChangeSortType(e.type);
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
                    {isSearching ? (
                      <Icon as={CloseIcon} size="xl" />
                    ) : (
                      <Icon as={SearchIcon} size="xl" />
                    )}
                  </Pressable>
                )}
              </View>
            </View>
          </>
        }
      />
      {isSearching && (
        <View px={16} bg="$white">
          <SearchInput placeholder="Tên sản phẩm, barcode" onChangeText={handleChangeText} />
        </View>
      )}
    </>
  );
};
