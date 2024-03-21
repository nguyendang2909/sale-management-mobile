import _, { ListIterator, Many, NotVoid, PartialShallow, PropertyName } from 'lodash';
import { PRODUCT_SORT_TYPES } from 'src/constants/constants';
import { AppStore, Entity, ProductSortType } from 'src/types';

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

  filter(
    data: AppStore.Product[],
    { searchText, sortBy }: { searchText?: string; sortBy: ProductSortType },
  ) {
    let products = _.chain(data);
    if (searchText) {
      products = products.filter(e => {
        return (
          (!!e.title && new RegExp(e.title, 'i').test(e.title)) ||
          (!!e.sku && new RegExp(e.sku, 'i').test(e.sku))
        );
      });
    }
    if (sortBy) {
      const orderOptions = this.getOrderByOptions(sortBy);
      products = products.orderBy(orderOptions.iteratees, orderOptions.orders);
    }
    return products.value();
  }

  getOrderByOptions(sortBy: ProductSortType): {
    iteratees?: Many<
      ListIterator<AppStore.Product, NotVoid> | PropertyName | PartialShallow<AppStore.Product>
    >;
    orders?: Many<boolean | 'asc' | 'desc'>;
  } {
    switch (sortBy) {
      case PRODUCT_SORT_TYPES.CUSTOM:
        return {
          iteratees: ['id'],
          orders: ['asc'],
        };
      case PRODUCT_SORT_TYPES.IN_STOCK_ASC:
        return {
          iteratees: ['isInStock', 'title'],
          orders: ['asc', 'asc'],
        };
      case PRODUCT_SORT_TYPES.IN_STOCK_DESC:
        return {
          iteratees: ['isInStock', 'title'],
          orders: ['asc', 'desc'],
        };
      case PRODUCT_SORT_TYPES.TITLE_ASC:
        return {
          iteratees: ['title'],
          orders: ['asc'],
        };
      case PRODUCT_SORT_TYPES.TITLE_DESC:
        return {
          iteratees: ['title'],
          orders: ['desc'],
        };
      case PRODUCT_SORT_TYPES.PRICE_ASC:
        return {
          iteratees: ['price'],
          orders: ['asc'],
        };
      case PRODUCT_SORT_TYPES.PRICE_DESC:
        return {
          iteratees: ['price'],
          orders: ['desc'],
        };
      case PRODUCT_SORT_TYPES.NEWEST:
        return {
          iteratees: ['createdAt'],
          orders: ['asc'],
        };
      case PRODUCT_SORT_TYPES.OLDEST:
        return {
          iteratees: ['createdAt'],
          orders: ['desc'],
        };
      default:
        return {
          iteratees: ['id'],
          orders: ['asc'],
        };
    }
  }
}

export const productUtil = new ProductUtil();
