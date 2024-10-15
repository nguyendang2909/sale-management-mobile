import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { ControlProductCapitalPrice } from './control/control-product-capital-price';
import { ControlProductCategories } from './control/control-product-categories';
import { ControlProductImages } from './control/control-product-images';
import { ControlProductPrice } from './control/control-product-price';
import { ControlProductTitle } from './control/control-product-title';
import { ControlProductUnit } from './control/control-product-unit';
import { ControlProductPromotionPrice } from './control/control-promotional-price';

export const SectionProductBasicInfo: FC<
  ViewProps & {
    control: Control<FormParams.CreateProduct, any>;
    hasDefaultVariant: boolean;
  }
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
                <ControlProductCapitalPrice flex={1} control={control} />
              </View>
            </View>
            <ControlProductPromotionPrice mt={16} control={control} />
          </>
        )}
        <ControlProductUnit mt={16} control={control} />
        <ControlProductCategories mt={16} control={control} />
      </View>
    </>
  );
};
