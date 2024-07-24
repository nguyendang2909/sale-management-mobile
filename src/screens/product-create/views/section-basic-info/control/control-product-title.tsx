import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { ProductTitleInput } from './form/product-title-input';

export const ControlProductTitle: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.CreateProduct, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View {...viewProps}>
            <ProductTitleInput
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
