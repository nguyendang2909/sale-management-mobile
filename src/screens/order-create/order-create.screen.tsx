import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { PickProducts } from './views/form/pick-product-list';
import { CreateOrderHeader } from './views/header/create-order-header';

type FCProps = AppStackScreenProps<'ORDER_CREATE'>;

export const OrderCreateScreen: FC<FCProps> = props => {
  return (
    <>
      <CreateOrderHeader />
      <View mt={8} />
      <PickProducts values={props.route.params.values} />
    </>
  );
};
