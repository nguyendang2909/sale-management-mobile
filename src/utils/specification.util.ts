import { v4 as uuidV4 } from 'uuid';

import { BaseUtil } from './base/base.util';

class SpecificationUtil extends BaseUtil {
  generateId() {
    return uuidV4();
  }
}

export const specificationUtil = new SpecificationUtil();
