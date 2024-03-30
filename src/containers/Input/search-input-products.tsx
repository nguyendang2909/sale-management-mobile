import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { SearchInput } from 'src/components/input/search-input';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setProductSearchText } from 'src/store/cache';

export const SearchInputProducts: FC<{ viewProps?: ComponentProps<typeof View> }> = ({
  viewProps,
}) => {
  const searchText = useAppSelector(s => s.cache.product.searchText);
  const isSearching = useAppSelector(s => s.cache.product.isSearching);
  const dispatch = useAppDispatch();

  const handleChangeText = (e: string) => {
    dispatch(setProductSearchText(e));
  };

  return (
    <>
      {isSearching && (
        <View {...viewProps}>
          <SearchInput
            defaultValue={searchText}
            value={searchText}
            placeholder="Tên sản phẩm, barcode"
            onChangeText={handleChangeText}
          />
        </View>
      )}
    </>
  );
};
