import { View } from '@gluestack-ui/themed';
import { ComponentProps, createRef, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { FormParams } from 'src/types';

import { InputPaymentAmount } from './input/input-payment-amount';

export const ControlPaymentAmount: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.UpdateOrderPayment, any>;
    currentMissingAmount: number;
  }
> = ({ control, currentMissingAmount, ...viewProps }) => {
  const ref = createRef<TextInput>();

  return (
    <>
      <Controller
        control={control}
        name="amount"
        rules={{ required: true }}
        render={({ field, fieldState }) => {
          return (
            <View {...viewProps}>
              <InputPaymentAmount
                isRequired={true}
                label="Khách trả"
                inputMode="numeric"
                value={field.value || 0}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="0.000"
                error={fieldState.error?.message}
                currentMissingAmount={currentMissingAmount}
                ref={ref}
              />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
