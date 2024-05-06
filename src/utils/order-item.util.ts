import { Entity } from 'src/types';

import { BaseUtil } from './base/base.util';

class OrderItemUtil extends BaseUtil {
  getAmount(orderItem: Entity.OrderItem) {
    return (orderItem.promotionalPrice || orderItem.price || 0) * (orderItem.quantity || 0);
  }

  getPrice(orderItem: Entity.OrderItem) {
    return (orderItem.price || 0) * (orderItem.quantity || 0);
  }
}

export const orderItemUtil = new OrderItemUtil();
