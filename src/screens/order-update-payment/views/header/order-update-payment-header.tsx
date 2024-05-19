import { ChevronLeftIcon } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations/navigation-ref';

export const OrderUpdatePaymentHeader: FC = () => {
  const onLeftPress = () => {
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.ORDERS });
  };

  return (
    <>
      <Header title="Thanh toán" leftIcon={ChevronLeftIcon} onLeftPress={onLeftPress} />
    </>
  );
};
