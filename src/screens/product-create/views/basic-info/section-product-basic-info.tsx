import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { ControlProductCategories } from '../form/control-product-categories';
import { ProductCapitalPriceControl } from '../form/product-capital-price.control';
import { ProductImagesControl } from '../form/product-images.control';
import { ProductPriceControl } from '../form/product-price.control';
import { ProductPromotionalPriceControl } from '../form/product-promotional-price.control';
import { ProductTitleControl } from '../form/product-title.control';
import { ProductUnitControl } from '../form/product-unit.control';

export const SectionProductBasicInfo: FC<
  ViewProps & { control: Control<FormParams.CreateProduct, any>; hasDefaultSku: boolean }
> = ({ control, hasDefaultSku, ...viewProps }) => {
  return (
    <>
      <View px={16} py={8} bgColor="$white" {...viewProps}>
        <ProductTitleControl control={control} />
        <ProductImagesControl mt={16} control={control} />
        {hasDefaultSku && (
          <>
            <View mt={16}>
              <View flexDirection="row" columnGap={16}>
                <ProductPriceControl flex={1} control={control} />
                <ProductCapitalPriceControl flex={1} control={control} />
              </View>
            </View>
            <ProductPromotionalPriceControl mt={16} control={control} />
          </>
        )}
        <ProductUnitControl mt={16} control={control} />
        <ControlProductCategories mt={16} control={control} />
      </View>
    </>
  );
};
