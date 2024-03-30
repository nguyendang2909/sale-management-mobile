import { FormControlLabel, FormControlLabelText, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CreateProductImageCards } from 'src/containers/form-control/product/create-product-image-cards';
import { Entity } from 'src/types';

export const FormControlProductImages: FC<{
  control: Control<any, unknown>;
}> = ({ control }) => {
  return (
    <>
      <View>
        <FormControlLabel>
          <FormControlLabelText>Ảnh</FormControlLabelText>
        </FormControlLabel>
      </View>
      <View mt={8}>
        <Controller
          control={control}
          name="images"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => {
            const addImage = async (e: Entity.ProductImage) => {
              onChange([...value, e]);
            };

            const deleteImage = (image: Entity.ProductImage) => {
              onChange(value.filter(e => e.id !== image.id));
            };

            return (
              <CreateProductImageCards
                images={value}
                addImage={addImage}
                deleteImage={deleteImage}
              />
            );
          }}
        ></Controller>
      </View>
    </>
  );
};
