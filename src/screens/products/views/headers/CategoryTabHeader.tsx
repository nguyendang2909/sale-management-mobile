import { CloseIcon, Icon, Pressable, SearchIcon, View } from '@gluestack-ui/themed';
import { useCallback } from 'react';
import { Header } from 'src/components';
import { SearchInput } from 'src/components/input/search-input';
import { useAppDispatch, useDisclose } from 'src/hooks';
import { setCategorySearchText } from 'src/store/cache';

export const CategoryTabHeader = () => {
  const dispatch = useAppDispatch();
  //   const searchText = useAppSelector(s => s.cache.category.searchText);
  const { isOpen: isSearching, onOpen: onOpenSearching, onClose: onCloseSearching } = useDisclose();

  const handleOpenSearch = useCallback(() => {
    onOpenSearching();
  }, [onOpenSearching]);

  const handleCloseSearch = useCallback(() => {
    onCloseSearching();
    dispatch(setCategorySearchText(''));
  }, [dispatch, onCloseSearching]);

  const handleChangeText = (e: string) => {
    dispatch(setCategorySearchText(e));
  };

  return (
    <>
      <Header
        leftText="Danh mục"
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
          <SearchInput placeholder="Tên danh mục" onChangeText={handleChangeText} />
        </View>
      )}
    </>
  );
};
