import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { ControlProductPrice } from 'src/screens/product-create/views/section-basic-info/control/control-product-price';
import { FormParams, ViewProps } from 'src/types';

import { ControlProductCategories } from '../form/control-product-categories';
import { ProductCapitalPriceControl } from '../form/product-capital-price.control';
import { ProductPromotionalPriceControl } from '../form/product-promotional-price.control';
import { ProductUnitControl } from '../form/product-unit.control';
import { ControlProductImages } from './control/control-product-images';
import { ControlProductTitle } from './control/control-product-title';

export const SectionProductBasicInfo: FC<
  ViewProps & { control: Control<FormParams.CreateProduct, any>; hasDefaultVariant: boolean }
> = ({ control, hasDefaultVariant, ...viewProps }) => {
  return (
    <>
      <View px={16} py={8} bgColor="$white" {...viewProps}>
        <ControlProductTitle control={control} />
        <ControlProductImages mt={16} control={control} />
        {hasDefaultVariant && (
          <>
            <View mt={16}>
              <View flexDirection="row" columnGap={16}>
                <ControlProductPrice flex={1} control={control} />
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
