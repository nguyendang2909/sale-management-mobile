import { Button, ButtonIcon, ButtonText, Text, View } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useDisclose, useInit } from 'src/hooks';
import { FormParams, ViewProps } from 'src/types';

import { ModalProductClassification } from './modal/modal-product-classification';

export const SectionProductClassification: FC<
  ViewProps & {
    control: Control<FormParams.CreateProduct, any>;
    setSkus: (e: FormParams.CreateProductSku[]) => void;
  }
> = ({ control, setSkus, ...viewProps }) => {
  const {
    isOpen: isOpenModalClassification,
    onOpen: onOpenModalClassification,
    onClose: onCloseModalClassification,
  } = useDisclose();

  const handlePressAddClassification = useCallback(() => {
    onOpenModalClassification();
  }, [onOpenModalClassification]);

  const { isInit } = useInit();

  return (
    <>
      <View {...viewProps}>
        <View px={16} py={16} bgColor="$white">
          <View>
            <Text fontWeight="$bold">Phân loại</Text>
          </View>
          <View mt={16}>
            <Button variant="outline" onPress={handlePressAddClassification}>
              <ButtonIcon as={Plus} mr={4}></ButtonIcon>
              <ButtonText>Thêm phân loại</ButtonText>
            </Button>
          </View>
        </View>
      </View>

      {isInit && (
        <Controller
          control={control}
          name="attributes"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <ModalProductClassification
                currentAttributes={value}
                control={control}
                onClose={onCloseModalClassification}
                visible={isOpenModalClassification}
                setAttributes={onChange}
                setSkus={setSkus}
              />
            );
          }}
        ></Controller>
      )}
    </>
  );
};
