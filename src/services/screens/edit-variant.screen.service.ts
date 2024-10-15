import { FormParams } from 'src/types';

class EditVariantScreenService {
  setVariant: ((valueProductVariant: FormParams.CreateProductVariant) => void) | null;

  constructor() {
    this.setVariant = null;
  }

  appendSetVariant(func: ((valueProductVariant: FormParams.CreateProductVariant) => void) | null) {
    this.setVariant = func;
  }
}

export const editVariantScreenService = new EditVariantScreenService();
