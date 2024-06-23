import { FC } from 'react';
import { useOrder } from 'src/hooks';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { OrderContent } from './views/order-content';
import { OrderHeader } from './views/order-header';

type FCProps = AppStackScreenProps<'ORDER'>;

export const OrderScreen: FC<FCProps> = props => {
  const { data: order, refetch: refetchOrder } = useOrder(props.route.params.detail, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <OrderHeader order={order} />
      <OrderContent order={order} mt={16} refetchOrder={refetchOrder} />
    </>
  );
};
