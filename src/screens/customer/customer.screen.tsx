import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { HeaderCustomer } from './views/header/header-customer';

type FCProps = AppStackScreenProps<'CUSTOMER'>;

export const CustomerScreen: FC<FCProps> = props => {
  const customer = props.route.params.detail;
  return (
    <>
      <HeaderCustomer />
    </>
  );
};
