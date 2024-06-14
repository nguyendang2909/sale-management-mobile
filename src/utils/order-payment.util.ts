import _ from 'lodash';
import { Entity } from 'src/types';

import { BaseUtil } from './base/base.util';

class OrderPaymentUtil extends BaseUtil {
  getAllAmount(payments: Entity.OrderPayment[]): number {
    return _.sumBy(payments, 'amount') || 0;
  }

  getStatusTagTranslation(debt: number) {
    if (!debt) {
      return 'Đã thanh toán';
    }
    return 'Ghi nợ';
  }
}

export const orderPaymentUtil = new OrderPaymentUtil();
