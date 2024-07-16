import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlSwitch } from 'src/components';
import { FormParams } from 'src/types';

export const ControlSkuInStock: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditSku, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="isInStock"
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
