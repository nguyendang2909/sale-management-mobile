import _ from 'lodash';
import { AppStore, Entity } from 'src/types';

import { BaseUtil } from './base/base.util';

class CategoryUtil extends BaseUtil {
  formatMany(payload: Entity.Category[]): AppStore.Category[] {
    return payload;
  }

  formatOne(payload: Entity.Category): AppStore.Category {
    return payload;
  }

  sortAndUniq(news: AppStore.Category[], olds: AppStore.Category[]) {
    return _.chain([...news, ...olds])
      .uniqBy('id')
      .orderBy(['id'], ['asc'])
      .value();
  }

  formatManyAndSort(news: Entity.Category[], olds: AppStore.Category[]) {
    return _.chain(news).map(this.formatOne).concat(olds).uniqBy('id').orderBy('id', 'asc').value();
  }

  filter(data: AppStore.Category[], { searchText }: { searchText?: string }) {
    let categories = _.chain(data);
    if (searchText) {
      const textRegExp = new RegExp(searchText);
      categories = categories.filter(e => {
        return !!e.title && textRegExp.test(e.title);
      });
    }

    return categories.value();
  }
}

export const categoryUtil = new CategoryUtil();
