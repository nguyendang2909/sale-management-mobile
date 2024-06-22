import { yupResolver } from '@hookform/resolvers/yup';
import { ApiRequest, AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

class UpdateShopFormUtil {
  getResolver() {
    return yupResolver<FormParams.UpdateShop>(
      Yup.object({
        title: Yup.string().required('Thông tin bắt buộc'),
        phone: Yup.string().required().nullable(),
        address: Yup.string().required().nullable(),
        description: Yup.string().required().nullable(),
        openTime: Yup.string().required(),
        closeTime: Yup.string().required(),
      }),
    );
  }

  getDefaultValues(shop: AppStore.Shop): FormParams.UpdateShop {
    return {
      title: shop.title || '',
      phone: shop.phone || null,
      address: shop.address || null,
      description: shop.description || null,
      openTime: shop.openTime || '00:00',
      closeTime: shop.closeTime || '23:59',
    };
  }

  getRequestBody(values: FormParams.UpdateShop): ApiRequest.UpdateShop {
    return values;
  }
}

export const updateShopFormUtil = new UpdateShopFormUtil();
