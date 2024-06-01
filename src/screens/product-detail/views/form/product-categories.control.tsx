import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { ProductCategoryForm } from './form/product-category.form';

export const ProductCategoriesControl: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.UpdateProduct, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="categories"
        render={({ field }) => {
          return (
            <View {...viewProps}>
              <ProductCategoryForm value={field.value} onChange={field.onChange} />
            </View>
          );
        }}
      ></Controller>
    </>
  );
};
