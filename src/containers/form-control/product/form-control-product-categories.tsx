import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CreateProductCategoryFormControl } from 'src/screens/product-create/components/form-items/create-product-category-form-control';
import { AppStore } from 'src/types';

export const FormControlProductCategories: FC<{ control: Control<any, any> }> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="categories"
        rules={{ required: true }}
        render={({ field }) => {
          const setCategory = (category: AppStore.Category) => {
            if (field.value.find(e => e.id === category.id)) {
              field.onChange(field.value.filter(e => e.id !== category.id));
            } else {
              field.onChange([...field.value, category]);
            }
          };
          return <CreateProductCategoryFormControl value={field.value} setCategory={setCategory} />;
        }}
      ></Controller>
    </>
  );
};
