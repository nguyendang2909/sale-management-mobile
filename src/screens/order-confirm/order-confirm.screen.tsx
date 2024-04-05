import { StatusBar, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { OrderConfirmForm } from './views/form/order-confirm-form';
import { OrderConfirmHeader } from './views/header/order-confirm-header';

type FCProps = AppStackScreenProps<'ORDER_CONFIRM'>;

export const OrderConfirmScreen: FC<FCProps> = props => {
  const data = props.route.params.pickedProducts;

  console.log(1111, data);

  return (
    <>
      <StatusBar barStyle="default" />
      <OrderConfirmHeader />
      <View mt={8}></View>
      <OrderConfirmForm />
    </>
  );
};
