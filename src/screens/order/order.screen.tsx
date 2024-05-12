import { StatusBar, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { OrderDetailContent } from './views/order-detail-content';
import { OrderDetailHeader } from './views/order-detail-header';

type FCProps = AppStackScreenProps<'ORDER_DETAIL'>;

export const OrderScreen: FC<FCProps> = props => {
  return (
    <>
      <StatusBar barStyle="default" />
      <OrderDetailHeader />
      <View mt={8} />
      <OrderDetailContent detail={props.route.params.detail} />
    </>
  );
};
