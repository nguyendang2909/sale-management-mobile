import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { FormParams } from 'src/types';

import { ProductVariantItem } from './product-variant-item';

export const ProductVariantList: FC<{
  variants: FormParams.CreateProductVariant[];
  setVariant: (index: number, valueProductVariant: FormParams.CreateProductVariant) => void;
  getProduct: UseFormGetValues<FormParams.CreateProduct>;
}> = ({ variants, setVariant, getProduct }) => {
  const variantsLength = variants.length;

  return (
    <>
      <View>
        {variants.map((variant, index) => {
          return (
            <ProductVariantItem
              key={variant.id || index.toString()}
              variant={variant}
              setVariant={setVariant}
              variantsLength={variantsLength}
              index={index}
              getProduct={getProduct}
            />
          );
        })}
      </View>
    </>
  );
};
