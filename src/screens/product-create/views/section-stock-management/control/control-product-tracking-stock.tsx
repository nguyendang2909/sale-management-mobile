import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { SwitchProductTrackingStock } from './switch/switch-product-tracking-stock';

export const ControlProductTrackingStock: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct | FormParams.UpdateProduct, any>;
  }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.isInStock"
        rules={{ required: true }}
        render={({ field }) => (
          <View {...viewProps}>
            <SwitchProductTrackingStock value={field.value} onChange={field.onChange} />
          </View>
        )}
      ></Controller>
    </>
  );
};
