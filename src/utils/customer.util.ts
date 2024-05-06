import _ from 'lodash';
import { AppStore, Entity } from 'src/types';

import { BaseUtil } from './base/base.util';

class CustomerUtil extends BaseUtil {
  formatMany(payload: Entity.Customer[]): AppStore.Customer[] {
    return payload;
  }

  formatOne(payload: Entity.Customer): AppStore.Customer {
    return payload;
  }

  sortAndUniq(news: AppStore.Customer[], olds: AppStore.Customer[]) {
    return _.chain([...news, ...olds])
      .uniqBy('id')
      .orderBy(['fullName'], ['asc'])
      .value();
  }

  formatManyAndSort(news: Entity.Customer[], olds: AppStore.Customer[]) {
    return _.chain(news)
      .map(this.formatOne)
      .concat(olds)
      .uniqBy('id')
      .orderBy('fullName', 'asc')
      .value();
  }

  getFullName(customer?: AppStore.Customer | Entity.Customer) {
    return customer?.fullName || 'Khách lẻ';
  }
}

export const customerUtil = new CustomerUtil();
