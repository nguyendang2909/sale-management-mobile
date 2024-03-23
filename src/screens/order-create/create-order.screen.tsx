import { StatusBar, View } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CreateOrderPickProducts } from './views/form/create-order-pick-products';
import { CreateOrderHeader } from './views/header/create-order-header';

export const CreateOrder = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <CreateOrderHeader />

      {/* 
      //@ts-ignore */}
      <View as={SafeAreaView} edges={['bottom']} flex={1}>
        <CreateOrderPickProducts />
      </View>
    </>
  );
};
