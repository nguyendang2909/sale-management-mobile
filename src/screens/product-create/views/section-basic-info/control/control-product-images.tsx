import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useAppSelector } from 'src/hooks';
import { FormParams } from 'src/types';

import { FormProductImages } from './form/form-product-images';

export const ControlProductImages: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct, any>;
  }
> = ({ control, ...viewProps }) => {
  const showImage = useAppSelector(s => s.app.productSettings.showImage);

  return (
    <>
      <Controller
        control={control}
        name="images"
        render={({ field: { value, onChange } }) => {
          if (!!showImage || !!value?.length) {
            return <FormProductImages {...viewProps} value={value} onChange={onChange} />;
          }
          return <></>;
        }}
      ></Controller>
    </>
  );
};
