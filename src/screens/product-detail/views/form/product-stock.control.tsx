import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IntegerInput } from 'src/components/form/integer-input';
import { FormParams } from 'src/types';

export const ProductStockControl: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.UpdateProduct, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.stock"
        render={({ field }) => (
          <View {...viewProps}>
            <IntegerInput
              label="Tồn kho"
              value={field.value?.toString()}
              onChange={field.onChange}
              focusable={true}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
