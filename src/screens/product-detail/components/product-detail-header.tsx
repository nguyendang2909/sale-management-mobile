import { useNavigation } from '@react-navigation/native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';

export const ProductDetailHeader = () => {
  const navigation = useNavigation();
  const onLeftPress = () => {
    navigation.navigate(SCREENS.Home, {
      screen: HOME_SCREENS.PRODUCT,
    });
  };

  return (
    <>
      <Header
        leftText="Sản phẩm"
        title="Chi tiết"
        onLeftPress={onLeftPress}
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
    </>
  );
};
