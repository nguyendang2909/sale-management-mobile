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
  defaultSkus?: FormParams.CreateProductSku[];
  defaultAttributes?: FormParams.CreateProductAttribute[];
}> = ({ control, getSkus, onClose, isOpen, setSkus, defaultAttributes, defaultSkus }) => {
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
              defaultAttributes={defaultAttributes}
              defaultSkus={defaultSkus}
            />
          );
        }}
      ></Controller>
    </>
  );
};
