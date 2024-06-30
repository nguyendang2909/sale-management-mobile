import { useCallback } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const HeaderCashItemAdd = () => {
  const handleLeftPress = useCallback(() => {
    navigate(SCREENS.HOME, { screen: HOME_SCREENS.CASH_ITEMS });
  }, []);

  return <Header title="Thu" onLeftPress={handleLeftPress} leftText="Thu chi" />;
};
