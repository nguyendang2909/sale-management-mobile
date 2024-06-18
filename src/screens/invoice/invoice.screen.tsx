import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { HeaderInvoice } from './views/header/header-invoice';

type FCProps = AppStackScreenProps<'INVOICE'>;

export const InvoiceScreen: FC<FCProps> = props => {
  const invoice = props.route.params.order;

  return (
    <>
      <HeaderInvoice />
    </>
  );
};
