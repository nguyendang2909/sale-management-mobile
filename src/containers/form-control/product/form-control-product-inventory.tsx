import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';

export const FormControlProductInventory: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="inventory"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControlInput
            label="Tồn kho"
            value={field.value?.toString()}
            onChange={e => {
              field.onChange(e ? +e : undefined);
            }}
            focusable={true}
          />
        )}
      ></Controller>
    </>
  );
};
