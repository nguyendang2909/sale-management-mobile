import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PriceInput } from 'src/components/form/price-input';
import { FormParams } from 'src/types';

export const ControlVariantPrice: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditVariant, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="price"
        rules={{ required: true }}
        render={({ field, fieldState }) => {
          return (
            <View {...viewProps}>
              <PriceInput
                isRequired={true}
                label="Giá bán"
                inputMode="numeric"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="0.000"
                error={fieldState.error?.message}
              />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
