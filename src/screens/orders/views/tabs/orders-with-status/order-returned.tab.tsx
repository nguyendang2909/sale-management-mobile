import { ORDER_STATUSES } from 'src/constants';

import { OrderTab } from './order.tab';

export const OrderDeliveredTab = () => {
  return <OrderTab status={ORDER_STATUSES.DELIVERED} />;
};
