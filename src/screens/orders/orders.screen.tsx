import { Box, StatusBar } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';
import { CustomerTabs } from 'src/pages/customers/tabs/customer-tabs';

import { CreateOrderFab } from '../products/views/buttons/create-order-fab';

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
        <CustomerTabs />
        {/* <ProductsFlatList /> */}

        <CreateOrderFab />
      </Box>
    </>
  );
};
