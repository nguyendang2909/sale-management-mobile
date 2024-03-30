import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlProductCapitalPrice: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="capitalPrice"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <FormControlInput
            label="Giá vốn"
            inputMode="numeric"
            value={field.value?.toString()}
            onChange={e => {
              field.onChange(e ? +e : undefined);
            }}
            placeholder="0.0"
            error={fieldState.error?.message}
          />
        )}
      ></Controller>
    </>
  );
};
