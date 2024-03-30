import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlProductTitle: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FormControlInput
            isRequired
            label="Tên sản phẩm"
            value={value}
            onChange={onChange}
            placeholder="Ví dụ: Tương ớt Chinsu"
            onBlur={onBlur}
            error={error?.message}
          />
        )}
      ></Controller>
    </>
  );
};
