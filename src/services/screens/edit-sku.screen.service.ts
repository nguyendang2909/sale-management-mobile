import { FormParams } from 'src/types';

class EditSkuScreenService {
  setSku: ((skuValue: FormParams.CreateProductSku) => void) | null;
  constructor() {
    this.setSku = null;
  }

  appendSetSku(func: ((skuValue: FormParams.CreateProductSku) => void) | null) {
    this.setSku = func;
  }
}

export const editSkuScreenService = new EditSkuScreenService();
