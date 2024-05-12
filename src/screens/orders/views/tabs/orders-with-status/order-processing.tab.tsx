import { ORDER_STATUSES } from 'src/constants';

import { OrderTab } from './order.tab';

export const OrderProcessingTab = () => {
  return <OrderTab status={ORDER_STATUSES.PROCESSING} />;
};
