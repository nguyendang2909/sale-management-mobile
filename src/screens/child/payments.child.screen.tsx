import { ContentPayments } from '../payments/views/content-payments';
import { HeaderPayments } from '../payments/views/header/header-payments';

export const PaymentsChildScreen = () => {
  return (
    <>
      <HeaderPayments allowBack />
      <ContentPayments />
    </>
  );
};
