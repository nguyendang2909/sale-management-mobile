import { CloseIcon, Icon, SearchIcon } from '@gluestack-ui/themed';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setSearchProducts } from 'src/store/cache';

export const IconButtonSearchProducts = () => {
  const dispatch = useAppDispatch();
  const isSearching = useAppSelector(s => s.cache.product.isSearching);

  const handleOpenSearch = useCallback(() => {
    dispatch(setSearchProducts(true));
  }, [dispatch]);

  const handleCloseSearch = useCallback(() => {
    dispatch(setSearchProducts(false));
  }, [dispatch]);

  return (
    <>
      {isSearching ? (
        <TouchableOpacity onPress={handleCloseSearch}>
          <Icon color="$coolGray500" as={CloseIcon} size="lg" m={8} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleOpenSearch}>
          <Icon color="$coolGray500" as={SearchIcon} size="lg" m={8} />
        </TouchableOpacity>
      )}
    </>
  );
};
