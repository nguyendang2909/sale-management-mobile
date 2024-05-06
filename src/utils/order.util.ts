import moment from 'moment';
import { ORDER_STATUSES } from 'src/constants';
import { Entity, OrderStatus } from 'src/types';

import { BaseUtil } from './base/base.util';

class OrderUtil extends BaseUtil {
  getOrderStatusTagTranslation(status?: OrderStatus) {
    switch (status) {
      case ORDER_STATUSES.WAIT_TO_CONFIRM:
        return 'Chờ xác nhận';
      case ORDER_STATUSES.PROCESSING:
        return 'Đang xử lý';
      case ORDER_STATUSES.DELIVERED:
        return 'Hoàn thành';
      case ORDER_STATUSES.RETURNED:
        return 'Trả hàng';
      case ORDER_STATUSES.CANCELLED:
        return 'Huỷ';
      default:
        return '';
    }
  }

  getTime(order: Entity.Order) {
    if (!order.at) {
      return undefined;
    }
    return moment(order.at).format('HH:mm DD/MM');
  }
}

export const orderUtil = new OrderUtil();
