import { yupResolver } from '@hookform/resolvers/yup';
import { FormParams } from 'src/types';
import { v4 as uuidV4 } from 'uuid';
import * as Yup from 'yup';

class CreateProductFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProduct>(
      Yup.object({
        createMore: Yup.boolean().required(),
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
        attributes: Yup.array()
          .of(
            Yup.object({
              title: Yup.string().required(),
              specifications: Yup.array()
                .of(
                  Yup.object({
                    id: Yup.string().required(),
                    title: Yup.string().required(),
                  }),
                )
                .required(),
            }),
          )
          .required(),
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
                .lessThan(Yup.ref('price'), 'Giá khuyến mãi cần nhỏ hơn giá bán')
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

  getDefaultValues(): FormParams.CreateProduct {
    const defaultSpecificationId = uuidV4();
    return {
      title: '',
      minWholesalePriceQuantity: null,
      description: null,
      isInStock: true,
      unit: null,
      label: null,
      createMore: false,
      categories: [],
      images: [],
      attributes: [
        {
          title: 'default',
          specifications: [
            {
              title: 'default',
              id: defaultSpecificationId,
            },
          ],
        },
      ],
      skus: [
        {
          imageId: null,
          code: null,
          price: null,
          capitalPrice: null,
          promotionalPrice: null,
          wholesalePrice: null,
          stock: null,
          specificationIds: [defaultSpecificationId],
        },
      ],
    };
  }
}

export const createProductFormUtil = new CreateProductFormUtil();
