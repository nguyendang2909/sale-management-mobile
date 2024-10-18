import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { SwitchProductTrackingStock } from './switch/switch-product-tracking-stock';

export const ControlProductTrackingStock: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct, any>;
    setStock: (value: number | null) => void;
  }
> = ({ control, setStock, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="variants.0.isInStock"
        rules={{ required: true }}
        render={({ field }) => (
          <View {...viewProps}>
            <SwitchProductTrackingStock
              value={field.value}
              onChange={field.onChange}
              setStock={setStock}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
