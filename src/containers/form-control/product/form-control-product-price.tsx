import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlProductPrice: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="price"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <FormControlInput
            isRequired={true}
            label="Giá bán"
            inputMode="numeric"
            value={field.value?.toString()}
            onChange={e => {
              field.onChange(e ? +e : null);
            }}
            onBlur={field.onBlur}
            placeholder="0.0"
            error={fieldState.error?.message}
          />
        )}
      ></Controller>
    </>
  );
};
