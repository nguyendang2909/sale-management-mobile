import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlNumberInput } from 'src/components/form/form-control-number-input';

export const ProductCapitalPriceControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.capitalPrice"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <View {...viewProps}>
            <FormControlNumberInput
              label="Giá vốn"
              inputMode="numeric"
              value={field.value}
              onChange={field.onChange}
              placeholder="0.0"
              error={fieldState.error?.message}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
