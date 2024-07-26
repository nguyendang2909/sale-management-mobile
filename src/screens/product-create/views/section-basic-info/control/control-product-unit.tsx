import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';
import { useAppSelector } from 'src/hooks';
import { FormParams } from 'src/types';

export const ControlProductUnit: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct, any>;
  }
> = ({ control, ...viewProps }) => {
  const showUnit = useAppSelector(s => s.app.productSettings.showUnit);
  return (
    <>
      <Controller
        control={control}
        name="unit"
        rules={{ required: true }}
        render={({ field, fieldState }) => {
          if (!!showUnit || !!field.value) {
            return (
              <View {...viewProps}>
                <FormControlInput
                  label="Đơn vị"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Ví dụ: vỉ"
                  error={fieldState.error?.message}
                />
              </View>
            );
          }
          return <></>;
        }}
      ></Controller>
    </>
  );
};
