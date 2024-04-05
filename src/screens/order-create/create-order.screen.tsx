import { StatusBar, View } from '@gluestack-ui/themed';

import { PickProducts } from './views/form/pick-product-list';
import { CreateOrderHeader } from './views/header/create-order-header';

export const CreateOrder = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <CreateOrderHeader />
      <View mt={8} />
      <PickProducts />
    </>
  );
};
