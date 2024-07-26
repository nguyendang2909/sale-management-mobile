import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormParams } from 'src/types';

import { ModalProductClassification } from './modal/modal-product-classification';

export const ModalAttributes: FC<{
  control: Control<FormParams.CreateProduct, any>;
  getSkus: () => FormParams.CreateProductSku[];
  onClose: () => void;
  isOpen: boolean;
  setSkus: (e: FormParams.CreateProductSku[]) => void;
}> = ({ control, getSkus, onClose, isOpen, setSkus }) => {
  return (
    <>
      <Controller
        control={control}
        name="attributes"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          return (
            <ModalProductClassification
              currentAttributes={value}
              getSkus={getSkus}
              control={control}
              onClose={onClose}
              visible={isOpen}
              setAttributes={onChange}
              setSkus={setSkus}
            />
          );
        }}
      ></Controller>
    </>
  );
};
