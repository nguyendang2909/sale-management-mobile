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
        const variant = this.getVariantFromOptionValuesWithOptionsLength2({
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

  getVariantFromOptionValuesWithOptionsLength2({
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
    const firstCurrentVariant = currentVariants[0];
    if (firstCurrentVariant) {
      return this.getVariant({
        ...firstCurrentVariant,
        id: this.hasVariantIdInFlagsMap(firstCurrentVariant, variantIdFlagsMap)
          ? null
          : firstCurrentVariant.id,
        option1,
        option2,
      });
    }
    return this.getVariant({
      id: null,
      sku: null,
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

  getVariant(defaultVariant: FormParams.CreateProductVariant): FormParams.CreateProductVariant {
    const isInStock = !_.isUndefined(defaultVariant.isInStock) ? defaultVariant.isInStock : true;
    const variant = {
      id: defaultVariant.id || null,
      sku: defaultVariant.sku || null,
      price: defaultVariant.price || null,
      capitalPrice: defaultVariant.capitalPrice || null,
      promotionalPrice: defaultVariant.promotionalPrice || null,
      wholesalePrice: defaultVariant.wholesalePrice || null,
      stock: _.isNull(isInStock) ? defaultVariant.stock || 0 : null,
      isInStock,
      isEnabled: true,
      option1: !_.isUndefined(defaultVariant.option1) ? defaultVariant.option1 : null,
      option2: !_.isUndefined(defaultVariant.option2) ? defaultVariant.option2 : null,
    };
    return variant;
  }

  getNewOption(
    valueOptions: FormParams.CreateProductOption[],
    currentOptions: FormParams.CreateProductOption[],
    defaultOptions?: FormParams.CreateProductOption[],
  ): FormParams.CreateProductOption {
    const newIndex = valueOptions.length;
    if (defaultOptions?.length) {
      const defaultOption = defaultOptions[newIndex];
      if (defaultOption) {
        return {
          id: defaultOption.id,
          title: `Nhóm ${newIndex + 1}`,
          values: [],
        };
      }
    }
    if (currentOptions.length) {
      const currentOption = currentOptions[newIndex];
      if (currentOption) {
        return {
          id: currentOption.id,
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
    currentOptionValues?: string[],
    defaultOptionValues?: string[],
  ): string {
    const newIndex = valueOptionValues.length;
    if (defaultOptionValues?.length) {
      const defaultOptionValue = defaultOptionValues[newIndex];
      if (defaultOptionValue) {
        return value;
      }
    }
    if (currentOptionValues?.length) {
      const currentOptionValue = currentOptionValues[newIndex];
      if (currentOptionValue) {
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
