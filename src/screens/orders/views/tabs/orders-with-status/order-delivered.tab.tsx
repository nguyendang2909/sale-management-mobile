import { ORDER_STATUSES } from 'src/constants';

import { OrderTab } from './order.tab';

export const OrderReturnedTab = () => {
  return <OrderTab status={ORDER_STATUSES.RETURNED} />;
};
