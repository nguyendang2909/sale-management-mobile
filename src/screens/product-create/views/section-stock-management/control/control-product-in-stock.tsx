import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlSwitch } from 'src/components';
import { FormParams } from 'src/types';

export const ControlProductInStock: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct | FormParams.UpdateProduct, any>;
  }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.isInStock"
        render={({ field }) => (
          <View {...viewProps}>
            <FormControlSwitch
              {...viewProps}
              title="Còn hàng"
              value={!!field.value}
              setValue={field.onChange}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
