import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentPaymentSubtract } from './views/content-payment-subtract';
import { HeaderPaymentSubtract } from './views/header-payment-subtract';

export const PaymentSubtractScreen: FC<AppStackScreenProps<'PAYMENT_SUBTRACT'>> = () => {
  return (
    <>
      <HeaderPaymentSubtract />
      <ContentPaymentSubtract />
    </>
  );
};
