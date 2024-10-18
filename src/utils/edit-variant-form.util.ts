import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class EditVariantFormUtil {
  getResolver() {
    return yupResolver<FormParams.EditVariant>(
      Yup.object({
        id: Yup.string().required().nullable(),
        sku: Yup.string().required().nullable(),
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
        stock: Yup.number().integer().min(0).required().nullable(),
        isInStock: Yup.boolean().required().nullable(),
        option1: Yup.string().required().nullable(),
        option2: Yup.string().required().nullable(),
        isEnabled: Yup.boolean().required(),
      }),
    );
  }

  getDefaultValues(initValues?: FormParams.CreateProductVariant): FormParams.EditVariant {
    const isInStock = initValues?.isInStock !== undefined ? initValues?.isInStock : true;
    return {
      id: initValues?.id || null,
      sku: initValues?.sku || null,
      price: initValues?.price || null,
      capitalPrice: initValues?.capitalPrice || null,
      promotionalPrice: initValues?.promotionalPrice || null,
      wholesalePrice: initValues?.wholesalePrice || null,
      stock: _.isNull(isInStock) ? initValues?.stock || 0 : null,
      isInStock,
      isEnabled: !!initValues?.isEnabled,
      option1: initValues?.option1 || null,
      option2: initValues?.option2 || null,
    };
  }
}

export const editVariantFormUtil = new EditVariantFormUtil();
