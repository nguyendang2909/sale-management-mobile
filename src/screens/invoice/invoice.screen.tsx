import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentInvoice } from './views/content-invoice';
import { HeaderInvoice } from './views/header/header-invoice';

type FCProps = AppStackScreenProps<'INVOICE'>;

export const InvoiceScreen: FC<FCProps> = props => {
  const order = props.route.params.order;

  return (
    <>
      <HeaderInvoice />
      <ContentInvoice detail={order} />
    </>
  );
};
