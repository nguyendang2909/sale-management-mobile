import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlSwitch } from 'src/components';
import { FormParams } from 'src/types';

export const ControlVariantIsEnabled: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditVariant, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="isEnabled"
        render={({ field }) => (
          <View {...viewProps}>
            <FormControlSwitch
              {...viewProps}
              title="Hiển thị sản phẩn trong cửa hàng"
              value={!!field.value}
              setValue={field.onChange}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
