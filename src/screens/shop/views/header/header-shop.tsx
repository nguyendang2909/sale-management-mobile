import { useCallback } from 'react';
import { Header } from 'src/components';
import { SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderShop = () => {
  const onLeftPress = useCallback(() => {
    goBack(SCREENS.SETTINGS);
  }, []);

  return <Header onLeftPress={onLeftPress} title="Thông tin cửa hàng" />;
};
