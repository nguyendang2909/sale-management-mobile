import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentPaymentAdd } from './views/content-payment-add';
import { HeaderPaymentAdd } from './views/header-payment-add';

export const PaymentAddScreen: FC<AppStackScreenProps<'PAYMENT_ADD'>> = () => {
  return (
    <>
      <HeaderPaymentAdd />
      <ContentPaymentAdd />
    </>
  );
};
