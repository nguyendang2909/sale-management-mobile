import { Box, StatusBar } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';

import { CreateOrderFab } from '../products/views/buttons/create-order-fab';
import { OrderTabs } from './views/tabs/order-tabs';

export const OrdersScreen = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Header
        title="Đơn hàng"

        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <Box flex={1}>
        <OrderTabs />
        {/* <ProductsFlatList /> */}

        <CreateOrderFab />
      </Box>
    </>
  );
};
