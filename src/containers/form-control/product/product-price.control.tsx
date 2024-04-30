import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlNumberInput } from 'src/components/form/form-control-number-input';

export const ProductPriceControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.price"
        rules={{ required: true }}
        render={({ field, fieldState }) => {
          return (
            <View {...viewProps}>
              <FormControlNumberInput
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
