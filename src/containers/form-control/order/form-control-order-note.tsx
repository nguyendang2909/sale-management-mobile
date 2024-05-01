import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlOrderNote: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="note"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <FormControlInput
              label="Ghi chú"
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
