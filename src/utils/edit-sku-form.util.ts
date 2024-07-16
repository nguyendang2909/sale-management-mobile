import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class EditSkuFormUtil {
  getResolver() {
    return yupResolver<FormParams.EditSku>(
      Yup.object({
        code: Yup.string().required().nullable(),
        price: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .required('Thông tin bắt buộc'),
        capitalPrice: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .required()
          .nullable(),
        promotionalPrice: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .lessThan(Yup.ref('price'), 'Giá khuyến mãi cần nhỏ hơn giá bán')
          .required()
          .nullable(),
        wholesalePrice: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .required()
          .nullable(),
        stock: Yup.number().integer().positive().required().nullable(),
        isInStock: Yup.boolean().required().nullable(),
      }),
    );
  }

  getDefaultValues(initValues?: FormParams.CreateProductSku): FormParams.EditSku {
    return {
      code: initValues?.code || null,
      price: initValues?.price || null,
      capitalPrice: initValues?.capitalPrice || null,
      promotionalPrice: initValues?.promotionalPrice || null,
      wholesalePrice: initValues?.wholesalePrice || null,
      stock: initValues?.stock || null,
      isInStock: _.isUndefined(initValues?.isInStock) ? true : null,
    };
  }
}

export const editSkuFormUtil = new EditSkuFormUtil();
