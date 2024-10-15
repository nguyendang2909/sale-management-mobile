import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';
import { FormParams } from 'src/types';

export const ControlVariantCode: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditSku, any> }
> = ({ control, ...viewProps }) => {
  return (
    <Controller
      control={control}
      name="code"
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View {...viewProps}>
          <FormControlInput
            label="Mã SKU"
            value={value}
            onChange={onChange}
            placeholder="Mã vạch"
            onBlur={onBlur}
            error={error?.message}
          />
        </View>
      )}
    ></Controller>
  );
};
