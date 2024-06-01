import { FormControlLabel, FormControlLabelText, View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { CreateProductImageCards } from 'src/components/card/product/create-product-image-cards';
import { Entity } from 'src/types';

export const ProductImagesForm: FC<
  ComponentProps<typeof View> & {
    onChange: (e: Entity.ProductImage[]) => void;
    value: Entity.ProductImage[];
  }
> = ({ onChange, value, ...viewProps }) => {
  const addImage = async (e: Entity.ProductImage) => {
    onChange([...value, e]);
  };

  const deleteImage = (image: Entity.ProductImage) => {
    onChange(value.filter(e => e.id !== image.id));
  };

  return (
    <View {...viewProps}>
      <View>
        <FormControlLabel>
          <FormControlLabelText>Ảnh</FormControlLabelText>
        </FormControlLabel>
      </View>
      <View mt={8}>
        <CreateProductImageCards images={value} addImage={addImage} deleteImage={deleteImage} />
      </View>
    </View>
  );
};
