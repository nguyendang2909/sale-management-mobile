import _ from 'lodash';
import { AppStore, Entity } from 'src/types';

import { BaseUtil } from './base/base.util';

class ProductUtil extends BaseUtil {
  formatMany(payload: Entity.Product[]): AppStore.Product[] {
    return payload;
  }

  formatOne(payload: Entity.Product): AppStore.Product {
    return payload;
  }

  sortAndUniq(news: AppStore.Product[], olds: AppStore.Product[]) {
    return _.chain([...news, ...olds])
      .uniqBy('id')
      .orderBy(['id'], ['asc'])
      .value();
  }

  formatManyAndSort(news: Entity.Product[], olds: AppStore.Product[]) {
    return _.chain(news).map(this.formatOne).concat(olds).uniqBy('id').orderBy('id', 'asc').value();
  }
}

export const productUtil = new ProductUtil();
