import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { SwitchVariantTrackingStock } from './switch/switch-variant-tracking-stock';

export const ControlVariantTrackingStock: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditSku, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="isInStock"
        rules={{ required: true }}
        render={({ field }) => (
          <View {...viewProps}>
            <SwitchVariantTrackingStock value={field.value} onChange={field.onChange} />
          </View>
        )}
      ></Controller>
    </>
  );
};
