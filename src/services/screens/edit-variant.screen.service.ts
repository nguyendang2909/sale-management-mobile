import { FormParams } from 'src/types';

class EditVariantScreenService {
  setSku: ((valueProductVariant: FormParams.CreateProductVariant) => void) | null;

  constructor() {
    this.setSku = null;
  }

  appendSetSku(func: ((valueProductVariant: FormParams.CreateProductVariant) => void) | null) {
    this.setSku = func;
  }
}

export const editSkuScreenService = new EditVariantScreenService();
