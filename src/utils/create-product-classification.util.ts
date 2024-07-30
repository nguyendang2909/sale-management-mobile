import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { PRODUCT_ATTRIBUTE_TYPES_MAP } from 'src/constants';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

import { specificationUtil } from './specification.util';

class CreateProductClassificationFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProductClassification>(
      Yup.object({
        attributes: Yup.array()
          .of(
            Yup.object({
              id: Yup.string().required().nullable(),
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
    defaultSkus?: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku[] {
    if (attributes.length === 1) {
      return this.getSkusFromAttributesLength1(attributes, currentSkus, defaultSkus);
    }
    if (attributes.length === 2) {
      return this.getSkusFromAttributesLength2(attributes, currentSkus, defaultSkus);
    }
    return [this.getSku({ ...currentSkus[0], specificationIds: [] })];
  }

  getSkusFromAttributesLength1(
    attributes: FormParams.CreateProductAttribute[],
    currentSkus: FormParams.CreateProductSku[],
    defaultSkus?: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku[] {
    const skus: FormParams.CreateProductSku[] = [];
    const skuIdFlagsMap: Record<string, boolean> = {};
    for (let i = 0; i < attributes[0].specifications.length; i += 1) {
      const sku = this.getSkuFromSpecificationWithAttributesLength1({
        specification: attributes[0].specifications[i],
        currentSkus,
        defaultSkus,
        skuIdFlagsMap,
      });
      if (sku.id) {
        skuIdFlagsMap[sku.id] = true;
      }
      skus.push(sku);
    }
    return skus;
  }

  getSkuFromSpecificationWithAttributesLength1({
    specification,
    currentSkus,
    defaultSkus,
    skuIdFlagsMap,
  }: {
    specification: FormParams.CreateProductSpecification;
    currentSkus: FormParams.CreateProductSku[];
    defaultSkus?: FormParams.CreateProductSku[];
    skuIdFlagsMap: Record<string, boolean>;
  }): FormParams.CreateProductSku {
    const sameSku =
      currentSkus.find(sku => _.isEqual(sku.specificationIds, [specification.id])) ||
      defaultSkus?.find(sku => _.isEqual(sku.specificationIds, [specification.id]));
    if (sameSku && !this.hasSkuIdInFlagsMap(sameSku, skuIdFlagsMap)) {
      return this.getSku(sameSku);
    }
    const similarSku =
      currentSkus.find(sku => _.includes(sku.specificationIds, specification.id)) ||
      defaultSkus?.find(sku => _.includes(sku.specificationIds, specification.id));
    if (similarSku && !this.hasSkuIdInFlagsMap(similarSku, skuIdFlagsMap)) {
      return this.getSku({
        ...similarSku,
        specificationIds: [specification.id],
      });
    }
    const firstCurrentSku = currentSkus[0];
    if (firstCurrentSku) {
      return {
        ...firstCurrentSku,
        id: this.hasSkuIdInFlagsMap(firstCurrentSku, skuIdFlagsMap) ? null : firstCurrentSku.id,
        specificationIds: [specification.id],
      };
    }
    return this.getSku({
      id: null,
      specificationIds: [specification.id],
      code: null,
      price: null,
      capitalPrice: null,
      promotionalPrice: null,
      wholesalePrice: null,
      stock: null,
      isInStock: true,
    });
  }

  getSkusFromAttributesLength2(
    attributes: FormParams.CreateProductAttribute[],
    currentSkus: FormParams.CreateProductSku[],
    defaultSkus?: FormParams.CreateProductSku[],
  ): FormParams.CreateProductSku[] {
    const skus: FormParams.CreateProductSku[] = [];
    const skuIdFlagsMap: Record<string, boolean> = {};
    for (let i = 0; i < attributes[0].specifications.length; i += 1) {
      for (let j = 0; j < attributes[1].specifications.length; j += 1) {
        const sku = this.getSkuFromSpecificationWithAttributesLength2({
          firstSpecification: attributes[0].specifications[i],
          secondSpecification: attributes[1].specifications[j],
          currentSkus,
          defaultSkus,
          skuIdFlagsMap,
        });
        skus.push(sku);
        if (sku.id) {
          skuIdFlagsMap[sku.id] = true;
        }
      }
    }
    return skus;
  }

  getSkuFromSpecificationWithAttributesLength2({
    firstSpecification,
    secondSpecification,
    currentSkus,
    defaultSkus,
    skuIdFlagsMap,
  }: {
    firstSpecification: FormParams.CreateProductSpecification;
    secondSpecification: FormParams.CreateProductSpecification;
    currentSkus: FormParams.CreateProductSku[];
    defaultSkus?: FormParams.CreateProductSku[];
    skuIdFlagsMap: Record<string, boolean>;
  }): FormParams.CreateProductSku {
    const sameSku =
      currentSkus.find(sku =>
        _.isEqual(sku.specificationIds, [firstSpecification.id, secondSpecification.id]),
      ) ||
      defaultSkus?.find(sku =>
        _.isEqual(sku.specificationIds, [firstSpecification.id, secondSpecification.id]),
      );
    if (sameSku && !this.hasSkuIdInFlagsMap(sameSku, skuIdFlagsMap)) {
      return this.getSku(sameSku);
    }
    const similarSkuFirstSpecification =
      currentSkus.find(
        sku => sku.specificationIds.length && sku.specificationIds[0] === firstSpecification.id,
      ) ||
      defaultSkus?.find(
        sku => sku.specificationIds.length && sku.specificationIds[0] === firstSpecification.id,
      );
    if (
      similarSkuFirstSpecification &&
      !this.hasSkuIdInFlagsMap(similarSkuFirstSpecification, skuIdFlagsMap)
    ) {
      return this.getSku({
        ...similarSkuFirstSpecification,
        specificationIds: [firstSpecification.id, secondSpecification.id],
      });
    }
    const similarSkuSecondSpecification =
      currentSkus.find(
        sku =>
          sku.specificationIds.length &&
          sku.specificationIds[1] &&
          sku.specificationIds[1] === secondSpecification.id,
      ) ||
      defaultSkus?.find(
        sku =>
          sku.specificationIds.length &&
          sku.specificationIds[1] &&
          sku.specificationIds[1] === secondSpecification.id,
      );
    if (
      similarSkuSecondSpecification &&
      !this.hasSkuIdInFlagsMap(similarSkuSecondSpecification, skuIdFlagsMap)
    ) {
      return this.getSku({
        ...similarSkuSecondSpecification,
        specificationIds: [firstSpecification.id, secondSpecification.id],
      });
    }
    const firstCurrentSku = currentSkus[0];
    if (firstCurrentSku) {
      return {
        ...firstCurrentSku,
        id: this.hasSkuIdInFlagsMap(firstCurrentSku, skuIdFlagsMap) ? null : firstCurrentSku.id,
        specificationIds: [firstSpecification.id, secondSpecification.id],
      };
    }
    return this.getSku({
      id: null,
      specificationIds: [firstSpecification.id, secondSpecification.id],
      code: null,
      price: null,
      capitalPrice: null,
      promotionalPrice: null,
      wholesalePrice: null,
      stock: null,
      isInStock: true,
    });
  }

  getSku(defaultSku: FormParams.CreateProductSku): FormParams.CreateProductSku {
    const isInStock = !_.isUndefined(defaultSku.isInStock) ? defaultSku.isInStock : true;
    return {
      id: defaultSku.id || null,
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

  getNewAttribute(
    attributesValue: FormParams.CreateProductAttribute[],
    currentAttributes: FormParams.CreateProductAttribute[],
    defaultAttributes?: FormParams.CreateProductAttribute[],
  ): FormParams.CreateProductAttribute {
    const newIndex = attributesValue.length;
    if (defaultAttributes?.length) {
      const defaultAttribute = defaultAttributes[newIndex];
      if (defaultAttribute) {
        return {
          id: defaultAttribute.id,
          title: `Nhóm ${newIndex + 1}`,
          type: null,
          specifications: [],
        };
      }
    }
    if (currentAttributes.length) {
      const currentAttribute = currentAttributes[newIndex];
      if (currentAttribute) {
        return {
          id: currentAttribute.id,
          title: `Nhóm ${newIndex + 1}`,
          type: null,
          specifications: [],
        };
      }
    }
    return {
      id: null,
      title: `Nhóm ${newIndex + 1}`,
      type: null,
      specifications: [],
    };
  }

  getNewSpecification(
    { title }: { title: string },
    specificationsValue: FormParams.CreateProductSpecification[],
    currentSpecifications?: FormParams.CreateProductSpecification[],
    defaultSpecifications?: FormParams.CreateProductSpecification[],
  ): FormParams.CreateProductSpecification {
    const newIndex = specificationsValue.length;
    if (defaultSpecifications?.length) {
      const defaultSpecification = defaultSpecifications[newIndex];
      if (defaultSpecification) {
        return {
          id: defaultSpecification.id,
          title,
          imageId: null,
        };
      }
    }
    if (currentSpecifications?.length) {
      const currentSpecification = currentSpecifications[newIndex];
      if (currentSpecification) {
        return {
          id: currentSpecification.id,
          title,
          imageId: null,
        };
      }
    }
    return {
      id: specificationUtil.generateId(),
      title,
      imageId: null,
    };
  }

  hasSkuIdInFlagsMap(sku: FormParams.CreateProductSku, skuIdFlagsMap: Record<string, boolean>) {
    return sku.id && sku && skuIdFlagsMap[sku.id];
  }
}

export const createProductClassificationFormUtil = new CreateProductClassificationFormUtil();
