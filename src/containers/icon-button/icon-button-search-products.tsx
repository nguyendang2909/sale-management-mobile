import { CloseIcon, Icon, Pressable, SearchIcon } from '@gluestack-ui/themed';
import { useCallback } from 'react';
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
        <Pressable onPress={handleCloseSearch}>
          <Icon color="$coolGray500" as={CloseIcon} size="xl" />
        </Pressable>
      ) : (
        <Pressable onPress={handleOpenSearch}>
          <Icon color="$coolGray500" as={SearchIcon} size="xl" />
        </Pressable>
      )}
    </>
  );
};
