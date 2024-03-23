import { CloseIcon, Icon, Pressable, SearchIcon } from '@gluestack-ui/themed';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setSearchCategories } from 'src/store/cache';

export const IconButtonSearchCategories = () => {
  const dispatch = useAppDispatch();
  const isSearching = useAppSelector(s => s.cache.category.isSearching);

  const handleOpenSearch = useCallback(() => {
    dispatch(setSearchCategories(true));
  }, [dispatch]);

  const handleCloseSearch = useCallback(() => {
    dispatch(setSearchCategories(false));
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
