import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PriceInput } from 'src/components/form/price-input';
import { FormParams } from 'src/types';

export const ControlCashItemAmount: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.CreateCashItem, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="amount"
        rules={{ required: true }}
        render={({ field, fieldState }) => {
          return (
            <View {...viewProps}>
              <PriceInput
                isRequired={true}
                label="Số tiền"
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
