import { yupResolver } from '@hookform/resolvers/yup';
import { PRODUCT_ATTRIBUTE_TYPES_MAP } from 'src/constants';
import { AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

class UpdateProductFormUtil {
  getResolver() {
    return yupResolver<FormParams.UpdateProduct>(
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
                .of(
                  Yup.object({
                    id: Yup.string().required(),
                    // type: Yup.string()
                    //   .oneOf(Object.values(PRODUCT_SPECIFICATION_TYPES))
                    //   .required()
                    //   .nullable(),
                    title: Yup.string().required(),
                    imageId: Yup.string().required().nullable(),
                  }),
                )
                .required(),
            }),
          )
          .required(),
        skus: Yup.array()
          .of(
            Yup.object({
              id: Yup.string().required().nullable(),
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
              specificationIds: Yup.array().of(Yup.string().required()).required(),
            }),
          )
          .required(),
      }),
    );
  }

  getDefaultSkus(product: AppStore.Product): FormParams.UpdateProductSku[] {
    return product.skus?.length
      ? product.skus.map(sku => {
          return {
            id: sku.id || null,
            code: sku.code || null,
            price: sku.price || null,
            capitalPrice: sku.capitalPrice || null,
            promotionalPrice: sku.promotionalPrice || null,
            wholesalePrice: sku.wholesalePrice || null,
            stock: sku.stock || null,
            specificationIds: sku.specificationIds || [],
            isInStock: sku.isInStock || null,
          };
        })
      : [];
  }

  getDefaultAttributes(product: AppStore.Product): FormParams.UpdateProductAttribute[] {
    return product.attributes?.length
      ? product.attributes.map(attribute => {
          return {
            id: attribute.id || null,
            title: attribute.title || '',
            type: attribute.type || null,
            specifications: attribute.specifications?.length
              ? attribute.specifications.map(specification => {
                  return {
                    id: specification.id,
                    title: specification.title || '',
                    // type: ProductSpecificationType | null;
                    imageId: specification.imageId || null,
                  };
                })
              : [],
          };
        })
      : [];
  }

  getDefaultValues(product: AppStore.Product): FormParams.UpdateProduct {
    return {
      title: product.title || '',
      unit: product.unit || null,
      categoryIds: product.categories?.map(e => e.id) || [],
      images: product.images || [],
      minWholesalePriceQuantity: product.minWholesalePriceQuantity || null,
      description: product.description || null,
      label: product.label || null,
      skus: this.getDefaultSkus(product),
      attributes: this.getDefaultAttributes(product),
    };
  }
}

export const updateProductFormUtil = new UpdateProductFormUtil();
