import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PickerProductCategories } from 'src/screens/product-create/views/section-basic-info/control/picker/picker-product-categories';
import { FormParams } from 'src/types';

export const ControlProductCategories: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.UpdateProduct, any> }
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
