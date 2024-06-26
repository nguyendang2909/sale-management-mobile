import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { OrderConfirmForm } from './views/form/order-confirm-form';

type FCProps = AppStackScreenProps<'ORDER_CONFIRM'>;

export const OrderConfirmScreen: FC<FCProps> = ({
  route: {
    params: { values },
  },
}) => {
  return (
    <>
      <OrderConfirmForm values={values} />
    </>
  );
};
