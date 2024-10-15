import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { ModalProductClassification } from './modal/modal-product-classification';

export const ModalProductOptions: FC<{
  control: Control<FormParams.CreateProduct, any>;
  getVariants: () => FormParams.CreateProductVariant[];
  onClose: () => void;
  isOpen: boolean;
  setVariants: (e: FormParams.CreateProductVariant[]) => void;
  defaultVariants?: FormParams.CreateProductVariant[];
  defaultOptions?: FormParams.CreateProductOption[];
}> = ({ control, getVariants, onClose, isOpen, setVariants, defaultOptions, defaultVariants }) => {
  return (
    <>
      <Controller
        control={control}
        name="options"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          return (
            <ModalProductClassification
              currentOptions={value}
              getVariants={getVariants}
              control={control}
              onClose={onClose}
              visible={isOpen}
              setOptions={onChange}
              setVariants={setVariants}
              defaultOptions={defaultOptions}
              defaultVariants={defaultVariants}
            />
          );
        }}
      ></Controller>
    </>
  );
};
