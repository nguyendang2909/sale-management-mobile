import _ from 'lodash';

import { BaseUtil } from './base/base.util';

class FormParamUtil extends BaseUtil {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDifferent<T extends Record<string, any>>(
    values: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: Record<string, any>,
  ): Partial<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
