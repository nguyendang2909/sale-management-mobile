import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { OrderContent } from './views/order-content';
import { OrderHeader } from './views/order-header';

type FCProps = AppStackScreenProps<'ORDER'>;

export const OrderScreen: FC<FCProps> = props => {
  return (
    <>
      <OrderHeader />
      <OrderContent detail={props.route.params.detail} mt={16} />
    </>
  );
};
