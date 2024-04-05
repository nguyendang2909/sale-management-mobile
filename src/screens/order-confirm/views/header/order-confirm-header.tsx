import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations/navigation-ref';

export const OrderConfirmHeader = () => {
  const onLeftPress = () => {
    goBack(SCREENS.Home, { screen: HOME_SCREENS.ORDER });
  };

  return (
    <>
      <Header
        title="Xác nhận đơn"
        leftText="Sản phẩm"
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
      />
    </>
  );
};
