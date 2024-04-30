import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlInput } from 'src/components';
import { useAppSelector } from 'src/hooks';

export const ProductUnitControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  const showCreateProductUnit = useAppSelector(s => s.app.productSettings.showCreateProductUnit);
  return (
    <>
      <Controller
        control={control}
        name="unit"
        rules={{ required: true }}
        render={({ field, fieldState }) => {
          if (!!showCreateProductUnit || !!field.value) {
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
