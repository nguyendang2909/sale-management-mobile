import { Box } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { Header } from 'src/components';

import { CreateOrderFab } from '../products/views/buttons/create-order-fab';
import { OrderTabs } from './views/tabs/order-tabs';

export const OrdersScreen: FC = () => {
  return (
    <>
      <Header title="Đơn hàng" />
      <Box flex={1}>
        <OrderTabs />
        <CreateOrderFab />
      </Box>
    </>
  );
};
