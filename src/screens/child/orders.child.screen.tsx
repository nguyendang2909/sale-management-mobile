import React from 'react';

import { ContentOrders } from '../orders/views/content-orders';
import { HeaderOrders } from '../orders/views/header/header-orders';

export const OrdersChildScreen = () => {
  return (
    <>
      <HeaderOrders allowBack />
      <ContentOrders />
    </>
  );
};
