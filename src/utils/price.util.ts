import _ from 'lodash';

class PriceUtil {
  format(number: number) {
    return _.round(number);
  }
}

export const priceUtil = new PriceUtil();
