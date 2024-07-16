import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { FormParams } from 'src/types';

import { SkuItem } from './sku-item';

export const SkuList: FC<{
  skus: FormParams.CreateProductSku[];
  setSku: (index: number, skuValue: FormParams.CreateProductSku) => void;
  specificationsMap: Record<string, FormParams.CreateProductSpecification>;
  getProduct: UseFormGetValues<FormParams.CreateProduct>;
}> = ({ skus, setSku, specificationsMap, getProduct }) => {
  const skusLength = skus.length;

  return (
    <>
      <View>
        {skus.map((sku, index) => {
          return (
            <SkuItem
              key={sku.specificationIds.toString()}
              sku={sku}
              setSku={setSku}
              skusLength={skusLength}
              index={index}
              specificationsMap={specificationsMap}
              getProduct={getProduct}
            />
          );
        })}
      </View>
    </>
  );
};
