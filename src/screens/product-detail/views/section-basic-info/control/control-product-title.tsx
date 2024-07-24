import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputProductTitle } from 'src/screens/product-create/views/section-basic-info/control/form/input-product-title';
import { FormParams } from 'src/types';

export const ControlProductTitle: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.UpdateProduct, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View {...viewProps}>
            <InputProductTitle
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              errorMessage={error?.message}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
