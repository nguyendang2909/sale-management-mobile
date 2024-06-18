import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderInvoice = () => {
  const onLeftPress = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.ORDERS,
    });
  };

  return (
    <>
      <Header onLeftPress={onLeftPress} title="Chi tiết hoá đơnđơn" />
    </>
  );
};
