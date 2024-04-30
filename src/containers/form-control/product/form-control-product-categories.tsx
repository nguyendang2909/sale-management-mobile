import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ProductCategoryForm } from 'src/containers/form-control/product/form/product-category.form';

export const ProductCategoriesControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  return (
    <>
      <Controller
        control={control}
        name="categories"
        rules={{ required: true }}
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
