import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputShopTitle } from 'src/components';
import { FormParams } from 'src/types';

export const ControlShopTitle: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.CreateProfile, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="shopTitle"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <InputShopTitle
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error?.message}
            {...viewProps}
          />
        )}
      ></Controller>
    </>
  );
};
