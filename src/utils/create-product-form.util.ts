import { yupResolver } from '@hookform/resolvers/yup';
import { PRODUCT_ATTRIBUTE_TYPES, PRODUCT_SPECIFICATION_TYPES } from 'src/constants';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

import { specificationUtil } from './specification.util';

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
        categoryIds: Yup.array().max(5).required(),
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
              type: Yup.string()
                .oneOf(Object.values(PRODUCT_ATTRIBUTE_TYPES))
                .required()
                .nullable(),
              specifications: Yup.array()
                .of(
                  Yup.object({
                    id: Yup.string().required(),
                    type: Yup.string()
                      .oneOf(Object.values(PRODUCT_SPECIFICATION_TYPES))
                      .required()
                      .nullable(),
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
    const defaultSpecificationId = specificationUtil.generateId();
    return {
      title: '',
      minWholesalePriceQuantity: null,
      description: null,
      isInStock: true,
      unit: null,
      label: null,
      createMore: false,
      categoryIds: [],
      images: [],
      attributes: this.getDefaultAttributes(defaultSpecificationId),
      skus: this.getDefaultSkus(defaultSpecificationId),
    };
  }

  getDefaultAttributes(defaultSpecificationId: string) {
    return [
      {
        title: 'default',
        type: PRODUCT_ATTRIBUTE_TYPES.DEFAULT,
        specifications: [
          {
            title: 'default',
            id: defaultSpecificationId,
            type: null,
          },
        ],
      },
    ];
  }

  getDefaultSkus(defaultSpecificationId: string) {
    return [
      {
        code: null,
        price: null,
        capitalPrice: null,
        promotionalPrice: null,
        wholesalePrice: null,
        stock: null,
        specificationIds: [defaultSpecificationId],
      },
    ];
  }
}

export const createProductFormUtil = new CreateProductFormUtil();
