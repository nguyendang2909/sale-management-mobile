import { View } from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { IconButtonSearchProducts } from 'src/containers/icon-button/icon-button-search-products';
import { SearchInputProducts } from 'src/containers/Input/search-input-products';
import { useAppDispatch } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { cartActions } from 'src/store/cart';

export const OrderHeader = () => {
  const dispatch = useAppDispatch();

  const onLeftPress = () => {
    dispatch(cartActions.setCartItems({}));
    goBack(SCREENS.Home, { screen: HOME_SCREENS.ORDER });
  };

  return (
    <>
      <Header
        leftText="Đơn hàng"
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
        RightActionComponent={
          <View pr={8}>
            <IconButtonSearchProducts />
          </View>
        }
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <SearchInputProducts
        viewProps={{
          px: 16,
          bg: '$white',
          pb: 8,
        }}
      />
    </>
  );
};
