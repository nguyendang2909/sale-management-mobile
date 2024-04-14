import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';

export const OrderSettingHeader = () => {
  const navigation = useNavigation();

  const onLeftPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(SCREENS.Home, {
      screen: HOME_SCREENS.PRODUCT,
    });
  };

  return (
    <>
      <Header
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
        title="Cài đặt sản phẩm"
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
    </>
  );
};
