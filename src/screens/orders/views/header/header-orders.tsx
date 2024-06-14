import { FC } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderOrders: FC<{ allowBack?: boolean }> = ({ allowBack }) => {
  const handleBack = () => {
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.MANAGEMENT });
  };
  return (
    <>
      <Header
        title="Đơn hàng"
        {...(allowBack
          ? {
              onLeftPress: handleBack,
            }
          : {})}
      />
    </>
  );
};
