import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { SearchInput } from 'src/components/input/search-input';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setCategorySearchText } from 'src/store/cache';

export const SearchInputCategories: FC<{ viewProps?: ComponentProps<typeof View> }> = ({
  viewProps,
}) => {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector(s => s.cache.category.searchText);
  const isSearching = useAppSelector(s => s.cache.category.isSearching);

  const handleChangeText = (e: string) => {
    dispatch(setCategorySearchText(e));
  };

  return (
    <>
      {isSearching && (
        <View {...viewProps}>
          <SearchInput
            defaultValue={searchText}
            value={searchText}
            placeholder="Tên danh mục"
            onChangeText={handleChangeText}
          />
        </View>
      )}
    </>
  );
};
