import { ContentPayments } from './views/content-payments';
import { HeaderPayments } from './views/header/header-payments';

export const PaymentsScreen = () => {
  return (
    <>
      <HeaderPayments />
      <ContentPayments />
    </>
  );
};
