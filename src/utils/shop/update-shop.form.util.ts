import { yupResolver } from '@hookform/resolvers/yup';
import { WORKING_TIME_TYPES } from 'src/constants';
import { ApiRequest, AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

class UpdateShopFormUtil {
  getResolver() {
    return yupResolver<FormParams.UpdateShop>(
      Yup.object({
        title: Yup.string().required(),
        phone: Yup.string().required().nullable(),
        address: Yup.string().required().nullable(),
        description: Yup.string().required().nullable(),
        workingTimeType: Yup.string()
          .oneOf(Object.values(WORKING_TIME_TYPES))
          .required()
          .nullable(),
        openHour: Yup.string().required().nullable(),
        closeHour: Yup.string().required().nullable(),
      }),
    );
  }

  getDefaultValues(shop: AppStore.Shop): FormParams.UpdateShop {
    return {
      title: shop.title || '',
      phone: shop.phone || null,
      address: '',
      description: '',
      workingTimeType: null,
      openHour: '',
      closeHour: '',
    };
  }

  getRequestBody(values: FormParams.UpdateShop): ApiRequest.UpdateShop {
    return values;
  }
}

export const updateShopFormUtil = new UpdateShopFormUtil();
