import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { PRODUCT_ATTRIBUTE_TYPES_MAP } from 'src/constants';
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
                .oneOf(Object.values(PRODUCT_ATTRIBUTE_TYPES_MAP))
                .required()
                .nullable(),
              specifications: Yup.array()
                .min(1, 'Cần ít nhất 1 phân loại')
                .of(
                  Yup.object({
                    id: Yup.string().required(),
                    title: Yup.string().required(),
                    // type: Yup.string()
                    //   .oneOf(Object.values(PRODUCT_SPECIFICATION_TYPES))
                    //   .required()
                    //   .nullable(),
                    imageId: Yup.string().required().nullable(),
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

  getSkusFromAttributes(
    attributes: FormParams.CreateProductAttribute[],
    currentSkus: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku[] {
    if (attributes.length === 1) {
      return this.getSkusFromAttributesLength1(attributes, currentSkus);
    }
    if (attributes.length === 2) {
      return this.getSkusFromAttributesLength2(attributes, currentSkus);
    }
    return [this.getSku(currentSkus[0])];
  }

  getSkusFromAttributesLength1(
    attributes: FormParams.CreateProductAttribute[],
    currentSkus: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku[] {
    const skus: FormParams.CreateProductSku[] = [];
    for (let i = 0; i < attributes[0].specifications.length; i += 1) {
      skus.push(
        this.getSkuFromSpecificationWithAttributesLength1(
          attributes[0].specifications[i],
          currentSkus,
        ),
      );
    }
    return skus;
  }

  getSkuFromSpecificationWithAttributesLength1(
    specification: FormParams.CreateProductSpecification,
    currentSkus: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku {
    const sameSku = currentSkus.find(sku => _.isEqual(sku.specificationIds, [specification.id]));
    if (sameSku) {
      return this.getSku(sameSku);
    }
    const similarSku = currentSkus.find(sku => _.includes(sku.specificationIds, specification.id));
    if (similarSku) {
      return this.getSku({
        ...similarSku,
        specificationIds: [specification.id],
      });
    }
    return this.getSku({ ...currentSkus[0], specificationIds: [specification.id] });
  }

  getSkusFromAttributesLength2(
    attributes: FormParams.CreateProductAttribute[],
    currentSkus: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku[] {
    const skus: FormParams.CreateProductSku[] = [];
    for (let i = 0; i < attributes[0].specifications.length; i += 1) {
      for (let j = 0; j < attributes[1].specifications.length; j += 1) {
        skus.push(
          this.getSkuFromSpecificationWithAttributesLength2(
            attributes[0].specifications[i],
            attributes[1].specifications[j],
            currentSkus,
          ),
        );
      }
    }
    return skus;
  }

  getSkuFromSpecificationWithAttributesLength2(
    firstSpecification: FormParams.CreateProductSpecification,
    secondSpecification: FormParams.CreateProductSpecification,
    currentSkus: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku {
    const sameSku = currentSkus.find(sku =>
      _.isEqual(sku.specificationIds, [firstSpecification.id, secondSpecification.id]),
    );
    if (sameSku) {
      return this.getSku(sameSku);
    }
    const similarSku = currentSkus.find(
      sku =>
        _.includes(sku.specificationIds, firstSpecification.id) ||
        _.includes(sku.specificationIds, secondSpecification.id),
    );
    if (similarSku) {
      return this.getSku({
        ...similarSku,
        specificationIds: [firstSpecification.id, secondSpecification.id],
      });
    }
    return {
      code: null,
      price: currentSkus[0]?.price || null,
      capitalPrice: currentSkus[0]?.capitalPrice || null,
      promotionalPrice: currentSkus[0]?.promotionalPrice || null,
      wholesalePrice: currentSkus[0]?.wholesalePrice || null,
      stock: null,
      specificationIds: [firstSpecification.id, secondSpecification.id],
      isInStock: true,
    };
  }

  getSku(defaultSku: FormParams.CreateProductSku): FormParams.CreateProductSku {
    const isInStock = !_.isUndefined(defaultSku.isInStock) ? defaultSku.isInStock : true;
    return {
      code: defaultSku.code || null,
      price: defaultSku.price || null,
      capitalPrice: defaultSku.capitalPrice || null,
      promotionalPrice: defaultSku.promotionalPrice || null,
      wholesalePrice: defaultSku.wholesalePrice || null,
      stock: _.isNull(isInStock) ? defaultSku.stock || 0 : null,
      specificationIds: defaultSku.specificationIds || [],
      isInStock,
    };
  }
}

export const createProductClassificationFormUtil = new CreateProductClassificationFormUtil();
