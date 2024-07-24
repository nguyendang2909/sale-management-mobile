import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { PickerProductCategories } from '../../form/form/picker-product-categories';

export const ControlProductCategories: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.CreateProduct, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="categoryIds"
        render={({ field }) => {
          return (
            <View {...viewProps}>
              <PickerProductCategories value={field.value} onChange={field.onChange} />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
