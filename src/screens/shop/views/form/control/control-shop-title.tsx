import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { InputShopTitle } from './input/input-shop-title';

export const ControlShopTitle: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.UpdateShop, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View {...viewProps}>
            <InputShopTitle
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
