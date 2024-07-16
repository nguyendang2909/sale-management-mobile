import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { SwitchSkuTrackingStock } from './switch/switch-sku-tracking-stock';

export const ControlSkuTrackingStock: FC<
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
            <SwitchSkuTrackingStock value={field.value} onChange={field.onChange} />
          </View>
        )}
      ></Controller>
    </>
  );
};
