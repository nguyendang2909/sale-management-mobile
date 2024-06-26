import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';

export const ProductSettingHeader = () => {
  const navigation = useNavigation();

  const onLeftPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(SCREENS.HOME, {
      screen: HOME_SCREENS.PRODUCTS,
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
