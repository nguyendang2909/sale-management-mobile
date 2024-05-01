import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useAppSelector } from 'src/hooks';

import { ProductImagesForm } from './form/product-images-form';

export const ProductImagesControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  const showCreateProductImage = useAppSelector(s => s.app.productSettings.showCreateProductImage);

  return (
    <>
      <Controller
        control={control}
        name="images"
        render={({ field: { value, onChange } }) => {
          if (!!showCreateProductImage || !!value?.length) {
            return <ProductImagesForm {...viewProps} value={value} onChange={onChange} />;
          }
          return <></>;
        }}
      ></Controller>
    </>
  );
};
