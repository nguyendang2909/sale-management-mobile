import { Icon, Menu, MenuItem, MenuItemLabel, Pressable, View } from '@gluestack-ui/themed';
import { SortAscIcon } from 'lucide-react-native';
import { Header } from 'src/components';
import { PRODUCT_SORT_TYPE_DATA } from 'src/constants';
import { IconButtonSearchProducts } from 'src/containers/icon-button/icon-button-search-products';
import { SearchInputProducts } from 'src/containers/Input/SearchInputProducts';
import { useAppDispatch } from 'src/hooks';
import { setProductSortType } from 'src/store/cache';
import { ProductSortType } from 'src/types';

export const ProductTabHeader = () => {
  const dispatch = useAppDispatch();

  const handleChangeSortType = (e: ProductSortType) => {
    dispatch(setProductSortType(e));
  };

  return (
    <>
      <Header
        title="Sản phẩm"
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
                <IconButtonSearchProducts />
              </View>
            </View>
          </>
        }
      />
      <SearchInputProducts
        viewProps={{
          px: 16,
          bg: '$white',
        }}
      />
    </>
  );
};
