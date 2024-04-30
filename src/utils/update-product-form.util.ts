import { yupResolver } from '@hookform/resolvers/yup';
import { AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

class UpdateProductFormUtil {
  getResolver() {
    return yupResolver<FormParams.UpdateProduct>(
      // @ts-ignore
      Yup.object({
        title: Yup.string()
          .min(1, 'Thông tin bắt buộc')
          .max(200, 'Tên sản phẩm ít hơn 200 ký tự')
          .required('Thông tin bắt buộc'),
        isInStock: Yup.boolean().required().nullable(),
        sku: Yup.string().max(200).optional(),
        unit: Yup.string().max(50).required().nullable(),
        categories: Yup.array().max(5).required(),
        images: Yup.array().max(6).required(),
        // minWholesalePriceQuantity: Yup.number().integer('Số lượng sản phẩm không đúng').optional(),
        barcode: Yup.string().optional(),
        inventory: Yup.number().integer('Số lượng tồn kho không đúng').nullable().optional(),
        description: Yup.string().max(10000).required().nullable(),
        label: Yup.string().required().nullable(),
        minWholesalePriceQuantity: Yup.number().required().nullable(),
        attributes: Yup.array().required(),
        skus: Yup.array()
          .of(
            Yup.object({
              code: Yup.string().required().nullable(),
              imageId: Yup.string().required().nullable(),
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
                .required()
                .nullable(),
              wholesalePrice: Yup.number()
                .positive('Giá không đúng')
                .notOneOf([0], 'Giá không đúng')
                .required()
                .nullable(),
              stock: Yup.number().integer().positive().required().nullable(),
              specificationIds: Yup.array().of(Yup.string().required()).required(),
            }),
          )
          .required(),
      }),
    );
  }

  getDefaultValues(product: AppStore.Product): FormParams.UpdateProduct {
    return {
      title: product.title || '',
      isInStock: product.isInStock || null,
      unit: product.unit || null,
      categories: product.categories || [],
      images: product.images || [],
      minWholesalePriceQuantity: product.minWholesalePriceQuantity || null,
      description: product.description || null,
      label: product.label || null,
      skus: product.skus || [],
      attributes: product.attributes || [],
    };
  }
}

export const updateProductFormUtil = new UpdateProductFormUtil();
