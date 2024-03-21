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
        title="Chi tiết sản phẩm"
        leftIcon="caretLeft"
        onLeftPress={onLeftPress}
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
    </>
  );
};
