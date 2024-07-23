import { useCallback } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const HeaderPaymentAdd = () => {
  const handleLeftPress = useCallback(() => {
    navigate(SCREENS.HOME, { screen: HOME_SCREENS.PAYMENTS });
  }, []);

  return <Header title="Thu" onLeftPress={handleLeftPress} leftText="Thu chi" />;
};
