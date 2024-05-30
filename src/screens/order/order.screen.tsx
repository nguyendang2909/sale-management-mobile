import { FC } from 'react';
import { useOrder } from 'src/hooks';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { OrderContent } from './views/order-content';
import { OrderHeader } from './views/order-header';

type FCProps = AppStackScreenProps<'ORDER'>;

export const OrderScreen: FC<FCProps> = props => {
  const { data: order, isFetching: isFetchingOrder } = useOrder(props.route.params.detail);

  return (
    <>
      <OrderHeader order={order} />
      <OrderContent order={order} isFetchingOrder={isFetchingOrder} mt={16} />
    </>
  );
};
