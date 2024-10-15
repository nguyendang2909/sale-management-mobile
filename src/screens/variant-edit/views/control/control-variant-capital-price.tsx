import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PriceInput } from 'src/components/form/price-input';
import { FormParams } from 'src/types';

export const ControlVariantCapitalPrice: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditSku, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="capitalPrice"
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
