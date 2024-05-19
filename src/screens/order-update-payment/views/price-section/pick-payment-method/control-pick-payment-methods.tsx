import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { PickPaymentMethodList } from './pick-payment-method-list';

export const ControlPickPaymentMethod: FC<
  ViewProps & {
    control: Control<FormParams.UpdateOrderPayment, any>;
  }
> = ({ control, ...viewProps }) => {
  return (
    <Controller
      control={control}
      name="paymentMethod"
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <View {...viewProps}>
            <PickPaymentMethodList value={field.value} onChange={field.onChange} />
          </View>
        );
      }}
    ></Controller>
  );
};
