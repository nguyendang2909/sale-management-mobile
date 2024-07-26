import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { ProductTrackingStockSwitch } from './form/product-tracking-stock.switch';

export const ProductTrackingStockControl: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.CreateProduct, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="skus.0.isInStock"
        rules={{ required: true }}
        render={({ field }) => (
          <View {...viewProps}>
            <ProductTrackingStockSwitch
              value={field.value as boolean | null}
              onChange={field.onChange}
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
