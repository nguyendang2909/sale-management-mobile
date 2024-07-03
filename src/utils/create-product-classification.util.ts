import { yupResolver } from '@hookform/resolvers/yup';
import { PRODUCT_ATTRIBUTE_TYPES, PRODUCT_SPECIFICATION_TYPES } from 'src/constants';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class CreateProductClassificationFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProductClassification>(
      Yup.object({
        attributes: Yup.array()
          .of(
            Yup.object({
              title: Yup.string().required(),
              type: Yup.string()
                .oneOf(Object.values(PRODUCT_ATTRIBUTE_TYPES))
                .required()
                .nullable(),
              specifications: Yup.array()
                .min(1, 'Cần ít nhất 1 phân loại')
                .of(
                  Yup.object({
                    id: Yup.string().required(),
                    title: Yup.string().required(),
                    type: Yup.string()
                      .oneOf(Object.values(PRODUCT_SPECIFICATION_TYPES))
                      .required()
                      .nullable(),
                  }),
                )
                .required(),
            }),
          )
          .required(),
        // skus: Yup.array()
        //   .of(
        //     Yup.object({
        //       code: Yup.string().required().nullable(),
        //       imageId: Yup.string().required().nullable(),
        //       price: Yup.number()
        //         .positive('Giá không đúng')
        //         .notOneOf([0], 'Giá không đúng')
        //         .required('Thông tin bắt buộc'),
        //       capitalPrice: Yup.number()
        //         .positive('Giá không đúng')
        //         .notOneOf([0], 'Giá không đúng')
        //         .required()
        //         .nullable(),
        //       promotionalPrice: Yup.number()
        //         .positive('Giá không đúng')
        //         .notOneOf([0], 'Giá không đúng')
        //         .lessThan(Yup.ref('price'), 'Giá khuyến mãi cần nhỏ hơn giá bán')
        //         .required()
        //         .nullable(),
        //       wholesalePrice: Yup.number()
        //         .positive('Giá không đúng')
        //         .notOneOf([0], 'Giá không đúng')
        //         .required()
        //         .nullable(),
        //       stock: Yup.number().integer().positive().required().nullable(),
        //       specificationIds: Yup.array().of(Yup.string().required()).required(),
        //     }),
        //   )
        //   .required(),
      }),
    );
  }

  getDefaultValues({
    attributes,
  }: {
    attributes: FormParams.CreateProductAttribute[];
  }): FormParams.CreateProductClassification {
    return {
      attributes,
    };
  }
}

export const createProductClassificationFormUtil = new CreateProductClassificationFormUtil();
