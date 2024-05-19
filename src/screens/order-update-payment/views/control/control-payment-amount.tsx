import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { InputPaymentAmount } from './input/input-payment-amount';

export const ControlPaymentAmount: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.UpdateOrderPayment, any>;
    amount: number;
  }
> = ({ control, amount, ...viewProps }) => {
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
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="0.000"
                error={fieldState.error?.message}
                amount={amount}
              />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
