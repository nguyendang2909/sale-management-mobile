import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { useOrder } from 'src/hooks';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { OrderUpdatePaymentHeader } from './views/header/order-update-payment-header';
import { OrderUpdatePaymentContent } from './views/order-update-payment-content';

type FCProps = AppStackScreenProps<'ORDER_PAYMENT'>;

export const OrderPaymentScreen: FC<FCProps> = props => {
  const { data: order } = useOrder(props.route.params.order);

  return (
    <>
      <OrderUpdatePaymentHeader />
      <View mt={8} />
      <OrderUpdatePaymentContent
        detail={order}
        updateStatusDelivered={!!props.route.params.updateStatusDelivered}
      />
    </>
  );
};
