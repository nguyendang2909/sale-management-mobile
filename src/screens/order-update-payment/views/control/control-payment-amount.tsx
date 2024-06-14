import { View } from '@gluestack-ui/themed';
import { ComponentProps, createRef, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { Entity, FormParams } from 'src/types';

import { InputPaymentAmount } from './input/input-payment-amount';

export const ControlPaymentAmount: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.UpdateOrderPayment, any>;
    order: Entity.Order;
  }
> = ({ control, order, ...viewProps }) => {
  const ref = createRef<TextInput>();

  const payout =
    order.payments?.reduce((result, payment) => {
      return (payment.amount || 0) + result;
    }, 0) || 0;

  const amount = (order.amount || 0) - payout;

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
                amount={amount}
                ref={ref}
              />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
