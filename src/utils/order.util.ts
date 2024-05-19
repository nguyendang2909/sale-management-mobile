import _ from 'lodash';
import moment from 'moment';
import { ORDER_STATUSES } from 'src/constants';
import { AppStore, Entity, OrderStatus } from 'src/types';

import { BaseUtil } from './base/base.util';

class OrderUtil extends BaseUtil {
  getOrderStatusTagTranslation(status?: OrderStatus) {
    switch (status) {
      case ORDER_STATUSES.UNCONFIRMED:
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

  getPrice(order: Entity.Order) {
    return order.price || 0;
  }

  getAmount(order: Entity.Order) {
    return order.amount || 0;
  }

  getTotalPromotional(order: Entity.Order) {
    const price = this.getPrice(order);
    return order.amount ? _.subtract(price, order.amount) : price;
  }

  format(payload: Entity.Order): AppStore.Order {
    return payload;
  }

  formatManyAndSort(news: Entity.Order[], olds: AppStore.Order[]) {
    return _.chain(news)
      .map(e => this.format(e))
      .concat(olds)
      .uniqBy('id')
      .orderBy('at', 'desc')
      .value();
  }

  deleteFromArrById(id: string, orders: AppStore.Order[]) {
    return orders.filter(order => order.id !== id);
  }
}

export const orderUtil = new OrderUtil();
