import React, { FC } from 'react';

import { ContentOrders } from './views/content-orders';
import { HeaderOrders } from './views/header/header-orders';

export const OrdersScreen: FC = () => {
  return (
    <>
      <HeaderOrders />
      <ContentOrders />
    </>
  );
};
