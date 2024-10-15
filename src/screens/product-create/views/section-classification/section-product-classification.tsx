import { Button, ButtonIcon, ButtonText, Text, View } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { FC } from 'react';
import { Control, Controller, UseFormGetValues } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { ProductVariantList } from './modal/variant-list/product-variant-list';

export const SectionProductClassification: FC<
  ViewProps & {
    control: Control<FormParams.CreateProduct, any>;
    setVariant: (index: number, variantValue: FormParams.CreateProductVariant) => void;
    getProduct: UseFormGetValues<FormParams.CreateProduct>;
    hasDefaultVariant: boolean;
    onOpenModal: () => void;
  }
> = ({ control, setVariant, hasDefaultVariant, getProduct, onOpenModal, ...viewProps }) => {
  return (
    <>
      <View {...viewProps}>
        <View px={16} py={16} bgColor="$white">
          <View>
            <Text fontWeight="$bold">Phân loại</Text>
          </View>
          <View>
            <Controller
              control={control}
              name="variants"
              rules={{ required: true }}
              render={({ field: { value } }) => {
                if (hasDefaultVariant) {
                  return <></>;
                }
                return (
                  <ProductVariantList
                    setVariant={setVariant}
                    variants={value}
                    getProduct={getProduct}
                  />
                );
              }}
            ></Controller>
          </View>
          <View mt={16}>
            <Button variant="outline" onPress={onOpenModal}>
              <ButtonIcon as={Plus} mr={4}></ButtonIcon>
              <ButtonText>Thêm phân loại</ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
