import { useCallback } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const HeaderPaymentSubtract = () => {
  const handleLeftPress = useCallback(() => {
    navigate(SCREENS.HOME, { screen: HOME_SCREENS.PAYMENTS });
  }, []);

  return <Header title="Chi" onLeftPress={handleLeftPress} leftText="Thu chi" />;
};
