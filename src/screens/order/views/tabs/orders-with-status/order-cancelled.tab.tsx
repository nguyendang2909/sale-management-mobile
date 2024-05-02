import { ORDER_STATUSES } from 'src/constants';

import { OrderTab } from './order.tab';

export const OrderCancelledTab = () => {
  return <OrderTab status={ORDER_STATUSES.CANCELLED} />;
};
