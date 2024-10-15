import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class CreateProductClassificationFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProductClassification>(
      Yup.object({
        options: Yup.array()
          .of(
            Yup.object({
              id: Yup.string().required().nullable(),
              title: Yup.string().required(),
              values: Yup.array()
                .min(1, 'Cần ít nhất 1 phân loại')
                .of(Yup.string().required())
                .required(),
            }),
          )
          .required(),
      }),
    );
  }

  getVariantsFromOptions(
    options: FormParams.CreateProductOption[],
    currentVariants: FormParams.CreateProductVariant[],
    defaultVariants?: FormParams.CreateProductVariant[],
  ): FormParams.CreateProductVariant[] {
    if (options.length === 1) {
      return this.getVariantsFromOptionsLength1(options, currentVariants, defaultVariants);
    }
    if (options.length === 2) {
      return this.getVariantsFromOptionsLength2(options, currentVariants, defaultVariants);
    }
    return [this.getVariant({ ...currentVariants[0], option1: null, option2: null })];
  }

  getVariantsFromOptionsLength1(
    options: FormParams.CreateProductOption[],
    currentVariants: FormParams.CreateProductVariant[],
    defaultVariants?: FormParams.CreateProductVariant[],
  ): FormParams.CreateProductVariant[] {
    const variants: FormParams.CreateProductVariant[] = options[0].values.map(
      (optionValue, index) => {
        const findVariant =
          currentVariants[index] || defaultVariants?.[index] || currentVariants[0];
        return this.getVariant({
          ...findVariant,
          option1: optionValue,
          option2: null,
        });
      },
    );
    return variants;
  }

  getVariantsFromOptionsLength2(
    options: FormParams.CreateProductOption[],
    currentVariants: FormParams.CreateProductVariant[],
    defaultVariants?: FormParams.CreateProductVariant[],
  ): FormParams.CreateProductVariant[] {
    const variants: FormParams.CreateProductVariant[] = [];
    const variantIdFlagsMap: Record<string, boolean> = {};
    for (let i = 0; i < options[0].values.length; i += 1) {
      for (let j = 0; j < options[1].values.length; j += 1) {
        const variant = this.getSkuFromSpecificationWithAttributesLength2({
          option1: options[0].values[i],
          option2: options[1].values[j],
          currentVariants,
          defaultVariants,
          variantIdFlagsMap,
        });
        variants.push(variant);
        if (variant.id) {
          variantIdFlagsMap[variant.id] = true;
        }
      }
    }
    return variants;
  }

  getSkuFromSpecificationWithAttributesLength2({
    option1,
    option2,
    currentVariants,
    defaultVariants,
    variantIdFlagsMap,
  }: {
    option1: string;
    option2: string;
    currentVariants: FormParams.CreateProductVariant[];
    defaultVariants?: FormParams.CreateProductVariant[];
    variantIdFlagsMap: Record<string, boolean>;
  }): FormParams.CreateProductVariant {
    const sameVariant =
      currentVariants.find(variant => variant.option1 === option1 && variant.option2 === option2) ||
      defaultVariants?.find(variant => variant.option1 === option1 && variant.option2 === option2);

    if (sameVariant && !this.hasVariantIdInFlagsMap(sameVariant, variantIdFlagsMap)) {
      return this.getVariant(sameVariant);
    }
    const similarVariantOption1 =
      currentVariants.find(variant => variant.option1 && variant.option1 === option1) ||
      defaultVariants?.find(variant => variant.option1 && variant.option1 === option1);
    if (
      similarVariantOption1 &&
      !this.hasVariantIdInFlagsMap(similarVariantOption1, variantIdFlagsMap)
    ) {
      return this.getVariant({
        ...similarVariantOption1,
        option1,
        option2,
      });
    }
    const similarVariantOption2 =
      currentVariants.find(variant => variant.option2 && variant.option2 === option2) ||
      defaultVariants?.find(
        variant => variant.option1 && variant.option2 && variant.option2 === option2,
      );
    if (
      similarVariantOption2 &&
      !this.hasVariantIdInFlagsMap(similarVariantOption2, variantIdFlagsMap)
    ) {
      return this.getVariant({
        ...similarVariantOption2,
        option1,
        option2,
      });
    }
    const firstCurrentSku = currentVariants[0];
    if (firstCurrentSku) {
      return {
        ...firstCurrentSku,
        id: this.hasVariantIdInFlagsMap(firstCurrentSku, variantIdFlagsMap)
          ? null
          : firstCurrentSku.id,
        option1,
        option2,
      };
    }
    return this.getVariant({
      id: null,
      code: null,
      price: null,
      capitalPrice: null,
      promotionalPrice: null,
      wholesalePrice: null,
      stock: null,
      isInStock: true,
      option1,
      option2,
      isEnabled: true,
    });
  }

  getVariant(defaultSku: FormParams.CreateProductVariant): FormParams.CreateProductVariant {
    const isInStock = !_.isUndefined(defaultSku.isInStock) ? defaultSku.isInStock : true;
    return {
      id: defaultSku.id || null,
      code: defaultSku.code || null,
      price: defaultSku.price || null,
      capitalPrice: defaultSku.capitalPrice || null,
      promotionalPrice: defaultSku.promotionalPrice || null,
      wholesalePrice: defaultSku.wholesalePrice || null,
      stock: _.isNull(isInStock) ? defaultSku.stock || 0 : null,
      isInStock,
      isEnabled: true,
      option1: !_.isUndefined(defaultSku.option1) ? defaultSku.option1 : null,
      option2: !_.isUndefined(defaultSku.option2) ? defaultSku.option2 : null,
    };
  }

  getNewOption(
    valueOptions: FormParams.CreateProductOption[],
    currentOptions: FormParams.CreateProductOption[],
    defaultOptions?: FormParams.CreateProductOption[],
  ): FormParams.CreateProductOption {
    const newIndex = valueOptions.length;
    if (defaultOptions?.length) {
      const defaultAttribute = defaultOptions[newIndex];
      if (defaultAttribute) {
        return {
          id: defaultAttribute.id,
          title: `Nhóm ${newIndex + 1}`,
          values: [],
        };
      }
    }
    if (currentOptions.length) {
      const currentAttribute = currentOptions[newIndex];
      if (currentAttribute) {
        return {
          id: currentAttribute.id,
          title: `Nhóm ${newIndex + 1}`,
          values: [],
        };
      }
    }
    return {
      id: null,
      title: `Nhóm ${newIndex + 1}`,
      values: [],
    };
  }

  getNewOptionValue(
    value: string,
    valueOptionValues: string[],
    currentSpecifications?: string[],
    defaultSpecifications?: string[],
  ): string {
    const newIndex = valueOptionValues.length;
    if (defaultSpecifications?.length) {
      const defaultSpecification = defaultSpecifications[newIndex];
      if (defaultSpecification) {
        return value;
      }
    }
    if (currentSpecifications?.length) {
      const currentSpecification = currentSpecifications[newIndex];
      if (currentSpecification) {
        return value;
      }
    }
    return value;
  }

  hasVariantIdInFlagsMap(
    variant: FormParams.CreateProductVariant,
    variantIdFlagsMap: Record<string, boolean>,
  ) {
    return variant.id && variant && variantIdFlagsMap[variant.id];
  }
}

export const createProductClassificationFormUtil = new CreateProductClassificationFormUtil();
