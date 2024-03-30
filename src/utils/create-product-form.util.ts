import { yupResolver } from '@hookform/resolvers/yup';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class CreateProductFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProduct>(
      // @ts-ignore
      Yup.object({
        title: Yup.string()
          .min(1, 'Thông tin bắt buộc')
          .max(200, 'Tên sản phẩm ít hơn 200 ký tự')
          .required('Thông tin bắt buộc'),
        price: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .required('Thông tin bắt buộc'),
        capitalPrice: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .nullable()
          .optional(),
        promotionalPrice: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .nullable()
          .optional(),
        wholesalePrice: Yup.number()
          .positive('Giá không đúng')
          .notOneOf([0], 'Giá không đúng')
          .nullable()
          .optional(),
        isInStock: Yup.boolean().optional(),
        isTrackingStock: Yup.boolean().optional(),
        sku: Yup.string().max(200).optional(),
        unit: Yup.string().max(50).optional(),
        categories: Yup.array().max(5).optional(),
        images: Yup.array().max(6).required(),
        // minWholesalePriceQuantity: Yup.number().integer('Số lượng sản phẩm không đúng').optional(),
        barcode: Yup.string().optional(),
        inventory: Yup.number().integer('Số lượng tồn kho không đúng').nullable().optional(),
        description: Yup.string().max(10000).optional(),
        label: Yup.string().optional(),
        createMore: Yup.boolean().required(),
      }),
    );
  }

  getDefaulValues() {
    return {
      title: '',
      price: null,
      capitalPrice: null,
      promotionalPrice: null,
      wholesalePrice: null,
      isInStock: true,
      isTrackingStock: false,
      sku: '',
      unit: '',
      createMore: false,
      categories: [],
      images: [],
      inventory: null,
    };
  }
}

export const createProductFormUtil = new CreateProductFormUtil();
