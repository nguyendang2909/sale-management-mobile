import { Box, StatusBar } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';
import { CreateCustomerFab } from 'src/pages/customers/create/create-customer-fab';
import { CustomerTabs } from 'src/pages/customers/tabs/customer-tabs';

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

        <CreateCustomerFab />
      </Box>
    </>
  );
};
