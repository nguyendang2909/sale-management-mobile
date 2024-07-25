import { Button, ButtonIcon, ButtonText, Text, View } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { FC } from 'react';
import { Control, Controller, UseFormGetValues } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { SkuList } from './modal/sku-list/sku-list';

export const SectionProductClassification: FC<
  ViewProps & {
    control: Control<FormParams.CreateProduct, any>;
    setSku: (index: number, skuValue: FormParams.CreateProductSku) => void;
    getProduct: UseFormGetValues<FormParams.CreateProduct>;
    hasDefaultSku: boolean;
    specificationsMap: Record<string, FormParams.CreateProductSpecification>;
    onOpenModal: () => void;
  }
> = ({
  control,
  setSku,
  hasDefaultSku,
  specificationsMap,
  getProduct,
  onOpenModal,
  ...viewProps
}) => {
  return (
    <>
      <View {...viewProps}>
        <View px={16} py={16} bgColor="$white">
          <View>
            <Text fontWeight="$bold">Phân loại</Text>
          </View>
          {!hasDefaultSku && (
            <View>
              <Controller
                control={control}
                name="skus"
                rules={{ required: true }}
                render={({ field: { value } }) => {
                  return (
                    <SkuList
                      setSku={setSku}
                      skus={value}
                      specificationsMap={specificationsMap}
                      getProduct={getProduct}
                    />
                  );
                }}
              ></Controller>
            </View>
          )}
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
