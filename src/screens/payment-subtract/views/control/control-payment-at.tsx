import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputPickDate } from 'src/components';
import { FormParams, ViewProps } from 'src/types';

export const ControlPaymentAt: FC<
  ViewProps & {
    control: Control<FormParams.CreatePayment>;
  }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="at"
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <View {...viewProps}>
              <InputPickDate label="Ngày" value={field.value} onChange={field.onChange} />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
