import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlOrderCustomer: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="customerId"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <FormControlInput
              label="Chọn khách hàng"
              value={value}
              onChange={onChange}
              placeholder="Ghi chú"
              onBlur={onBlur}
              error={error?.message}
            />
          );
        }}
      ></Controller>
    </>
  );
};
