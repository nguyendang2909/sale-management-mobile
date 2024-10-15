import { yupResolver } from '@hookform/resolvers/yup';
import { ApiRequest, AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

import { formParamUtil } from './form-params.util';

class UpdateProductFormUtil {
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
              isEnabled: Yup.boolean().required(),
            }),
          )
          .required(),
      }),
    );
  }

  getDefaultVariants(product: AppStore.Product): FormParams.CreateProductVariant[] {
    return product.variants?.length
      ? product.variants.map(variant => {
          return {
            id: variant.id || null,
            code: variant.code || null,
            price: variant.price || null,
            capitalPrice: variant.capitalPrice || null,
            promotionalPrice: variant.promotionalPrice || null,
            wholesalePrice: variant.wholesalePrice || null,
            stock: variant.stock || null,
            isInStock: variant.isInStock || null,
            isEnabled: true,
            option1: null,
            option2: null,
          };
        })
      : [];
  }

  getDefaultOptions(product: AppStore.Product): FormParams.CreateProductOption[] {
    return product.options?.length
      ? product.options.map(option => {
          return {
            id: option.id || null,
            title: option.title || '',
            values: option.values || [],
          };
        })
      : [];
  }

  getDefaultValues(product: AppStore.Product): FormParams.CreateProduct {
    return {
      title: product.title || '',
      unit: product.unit || null,
      categoryIds: product.categories?.map(e => e.id) || [],
      images: product.images || [],
      minWholesalePriceQuantity: product.minWholesalePriceQuantity || null,
      description: product.description || null,
      label: product.label || null,
      variants: this.getDefaultVariants(product),
      options: this.getDefaultOptions(product),
    };
  }

  getVariantPayload(
    variant: FormParams.CreateProductVariant,
    defaultVariantsMap: Record<string, FormParams.CreateProductVariant>,
  ): ApiRequest.UpdateProductVariant {
    const { id, price, ...restValue } = variant;
    if (id) {
      const defaultVariant = defaultVariantsMap[id];
      if (!defaultVariant) {
        throw new Error('Sản phẩm không đúng, vui lòng thử lại');
      }
      const { price: formVariantPriceValue, ...formVariantValue } = formParamUtil.getDifferent(
        variant,
        defaultVariant,
      );
      return {
        ...formVariantValue,
        id,
        ...(formVariantPriceValue && { price: formVariantPriceValue }),
      };
    }
    return { ...restValue, ...(price && { price }) };
  }
}

export const updateProductFormUtil = new UpdateProductFormUtil();
