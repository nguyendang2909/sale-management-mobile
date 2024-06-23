import { View } from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import { FC } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { IconButtonSearchProducts } from 'src/containers/icon-button/icon-button-search-products';
import { useAppDispatch } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { cartActions } from 'src/store/cart';
import { Entity } from 'src/types';

export const OrderHeader: FC<{ order: Entity.Order }> = () => {
  const dispatch = useAppDispatch();

  const onLeftPress = () => {
    dispatch(cartActions.setCartItems({}));
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.ORDERS });
  };

  return (
    <>
      <Header
        leftText="Đơn hàng"
        leftIcon={ChevronLeft}
        title="Chi tiết"
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
    </>
  );
};
