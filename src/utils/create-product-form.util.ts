import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class CreateProductFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProduct>(
      Yup.object({
        title: Yup.string()
          .min(1, 'Thông tin bắt buộc')
          .max(200, 'Tên sản phẩm ít hơn 200 ký tự')
          .required('Thông tin bắt buộc'),
        unit: Yup.string().max(50).required().nullable(),
        categoryIds: Yup.array().max(5).required(),
        images: Yup.array().max(6).required(),
        description: Yup.string().max(10000).required().nullable(),
        label: Yup.string().required().nullable(),
        minWholesalePriceQuantity: Yup.number().required().nullable(),
        options: Yup.array()
          .of(
            Yup.object({
              id: Yup.string().required().nullable(),
              title: Yup.string().required(),
              values: Yup.array().min(1).of(Yup.string().required()).required(),
            }),
          )
          .required(),
        variants: Yup.array()
          .of(
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
              stock: Yup.number().integer().positive().required().nullable(),
              isInStock: Yup.boolean().required().nullable(),
              option1: Yup.string().required().nullable(),
              option2: Yup.string().required().nullable(),
              isEnabled: Yup.boolean().required(),
            }),
          )
          .required(),
      }),
    );
  }

  getDefaultValues(initValues?: FormParams.CreateProduct): FormParams.CreateProduct {
    if (!_.isEmpty(initValues)) {
      return initValues;
    }
    return {
      title: '',
      minWholesalePriceQuantity: null,
      description: null,
      unit: null,
      label: null,
      categoryIds: [],
      images: [],
      options: this.getDefaultOptions(),
      variants: this.getDefaultVariants(),
    };
  }

  getDefaultOptions() {
    return [];
  }

  getDefaultVariants() {
    return [
      {
        id: null,
        sku: null,
        price: null,
        capitalPrice: null,
        promotionalPrice: null,
        wholesalePrice: null,
        stock: null,
        isInStock: true,
        option1: null,
        option2: null,
        isEnabled: true,
      },
    ];
  }
}

export const createProductFormUtil = new CreateProductFormUtil();
