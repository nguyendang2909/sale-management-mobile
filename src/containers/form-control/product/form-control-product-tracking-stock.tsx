import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlSwitch } from 'src/components';

export const FormControlProductTrackingStock: FC<{ control: Control<any, any> }> = ({
  control,
}) => {
  return (
    <>
      <Controller
        control={control}
        name="isTrackingStock"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControlSwitch
            title="Theo dõi tồn kho"
            value={field.value}
            setValue={field.onChange}
          />
        )}
      ></Controller>
    </>
  );
};
