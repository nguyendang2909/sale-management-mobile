import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PriceInput } from 'src/components/form/price-input';
import { FormParams } from 'src/types';

export const ControlProductCapitalPrice: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct | FormParams.UpdateProduct, any>;
  }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.capitalPrice"
        render={({ field, fieldState }) => (
          <View {...viewProps}>
            <PriceInput
              label="Giá vốn"
              inputMode="numeric"
              value={field.value}
              onChange={field.onChange}
              placeholder="0.000"
              error={fieldState.error?.message}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
