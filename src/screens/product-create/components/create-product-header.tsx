import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';

export const CreateProductHeader = () => {
  const navigation = useNavigation();
  const onLeftPress = () => {
    navigation.navigate(SCREENS.Home, {
      screen: HOME_SCREENS.PRODUCTS,
    });
  };

  return (
    <>
      <Header
        title="Thêm sản phẩm"
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
    </>
  );
};
