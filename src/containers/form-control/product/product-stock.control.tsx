import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlNumberInput } from 'src/components/form/form-control-number-input';

export const ProductStockControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.price"
        rules={{ required: true }}
        render={({ field }) => (
          <View {...viewProps}>
            <FormControlNumberInput
              label="Tồn kho"
              value={field.value?.toString()}
              onChange={e => {
                field.onChange(e ? +e : undefined);
              }}
              focusable={true}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
