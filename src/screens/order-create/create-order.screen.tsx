import { StatusBar, View } from '@gluestack-ui/themed';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/hooks';
import { cartActions } from 'src/store/cart';

import { PickProducts } from './views/form/pick-product-list';
import { CreateOrderHeader } from './views/header/create-order-header';

export const CreateOrder = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartActions.resetCartSettings());
  }, [dispatch]);

  return (
    <>
      <StatusBar barStyle="default" />
      <CreateOrderHeader />
      <View mt={8} />
      <PickProducts />
    </>
  );
};
