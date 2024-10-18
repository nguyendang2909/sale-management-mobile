import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { ControlProductInStock } from './control/control-product-in-stock';
import { ControlProductStock } from './control/control-product-stock';
import { ControlProductTrackingStock } from './control/control-product-tracking-stock';
import { ControlProductVariant } from './control/control-product-variant';

export const SectionStockManagement: FC<
  ViewProps & {
    control: Control<FormParams.CreateProduct, any>;
    isEnabled: boolean;
    isTrackingStock: boolean;
    setStock: (value: number | null) => void;
  }
> = ({ control, isEnabled, isTrackingStock, setStock, ...viewProps }) => {
  if (!isEnabled) {
    return null;
  }
  return (
    <>
      <View px={16} py={16} bgColor="$white" {...viewProps}>
        <View>
          <Text fontWeight="$bold">Quản lý tồn kho</Text>
        </View>
        <ControlProductVariant mt={16} control={control} />
        {!isTrackingStock && <ControlProductInStock mt={16} control={control} />}
        <ControlProductTrackingStock mt={16} control={control} setStock={setStock} />
        {isTrackingStock && <ControlProductStock mt={16} control={control} />}
      </View>
    </>
  );
};
