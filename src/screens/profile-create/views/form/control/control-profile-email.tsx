import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { InputProfileEmail } from '../../../../../components/input/input-profile-email';

export const ControlProfileEmail: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.CreateProfile, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <InputProfileEmail
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error?.message}
            {...viewProps}
          />
        )}
      ></Controller>
    </>
  );
};
