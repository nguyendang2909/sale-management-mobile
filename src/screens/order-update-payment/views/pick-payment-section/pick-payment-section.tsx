import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { ControlPickPaymentMethod } from '../price-section/pick-payment-method/control-pick-payment-methods';

export const PickPaymentSection: FC<
  ViewProps & { control: Control<FormParams.UpdateOrderPayment, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <View {...viewProps}>
        <View>
          <Text>Hình thức thanh toán:</Text>
        </View>
        <ControlPickPaymentMethod control={control} mt={16} />
      </View>
    </>
  );
};
