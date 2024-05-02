import { ORDER_STATUSES } from 'src/constants';

import { OrderTab } from './order.tab';

export const OrderWaitToConfirmTab = () => {
  return <OrderTab status={ORDER_STATUSES.WAIT_TO_CONFIRM} />;
};
