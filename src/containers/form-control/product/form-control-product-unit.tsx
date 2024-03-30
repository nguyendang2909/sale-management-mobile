import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlProductUnit: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="unit"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <FormControlInput
            label="Đơn vị"
            value={field.value}
            onChange={field.onChange}
            placeholder="Ví dụ: vỉ"
            error={fieldState.error?.message}
          />
        )}
      ></Controller>
    </>
  );
};
