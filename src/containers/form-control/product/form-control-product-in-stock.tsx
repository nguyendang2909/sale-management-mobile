import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlSwitch } from 'src/components';

export const FormControlProductInStock: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="isInStock"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControlSwitch title="Còn hàng" value={field.value} setValue={field.onChange} />
        )}
      ></Controller>
    </>
  );
};
