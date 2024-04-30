import _ from 'lodash';

import { BaseUtil } from './base/base.util';

class FormParamUtil extends BaseUtil {
  getDifferent<T>(values: T, defaultValues: Record<string, any>): Partial<T> {
    const result = Object.entries(values).reduce<any>((acc, [key, value]) => {
      if (!_.isEqual(value, defaultValues[key])) {
        return {
          ...acc,
          [key]: value,
        };
      }
      return acc;
    }, {});
    return result;
  }
}

export const formParamUtil = new FormParamUtil();
