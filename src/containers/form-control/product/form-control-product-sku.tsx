import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlProductSku: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="sku"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FormControlInput
            label="Mã SKU"
            value={value}
            onChange={onChange}
            placeholder="Mã vạch"
            onBlur={onBlur}
            error={error?.message}
          />
        )}
      ></Controller>
    </>
  );
};
