import { CloseIcon, Icon, SearchIcon } from '@gluestack-ui/themed';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
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
