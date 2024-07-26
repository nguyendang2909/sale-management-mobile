import { Button, ButtonIcon, ButtonText, CloseIcon, FlatList, View } from '@gluestack-ui/themed';
import _ from 'lodash';
import { Plus } from 'lucide-react-native';
import { FC, useCallback, useEffect } from 'react';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, ModalProps } from 'react-native';
import { Header, ViewFooter } from 'src/components';
import { FormParams } from 'src/types';
import { createProductClassificationFormUtil } from 'src/utils/create-product-classification.util';

import { ProductAttributeListItem } from './list/product-attribute-item';

export const ModalProductClassification: FC<
  ModalProps & {
    control: Control<FormParams.CreateProduct, any>;
    onClose: () => void;
    currentAttributes: FormParams.CreateProductAttribute[];
    setAttributes: (e: FormParams.CreateProductAttribute[]) => void;
    setSkus: (e: FormParams.CreateProductSku[]) => void;
    getSkus: () => FormParams.CreateProductSku[];
  }
> = ({ currentAttributes, onClose, setAttributes, setSkus, getSkus, ...modalProps }) => {
  const {
    reset: resetValueAttribute,
    setValue: setValueAttribute,
    getValues: getValuesAttribute,
    watch: watchAttribute,
    handleSubmit: handleSubmitAttribute,
    formState: { errors: errorsAttribute, isDirty },
  } = useForm<FormParams.CreateProductClassification>({
    defaultValues: createProductClassificationFormUtil.getDefaultValues({
      attributes: currentAttributes,
    }),
    resolver: createProductClassificationFormUtil.getResolver(),
  });

  useEffect(() => {
    if (!_.isEqual(currentAttributes, getValuesAttribute().attributes)) {
      resetValueAttribute({
        attributes: currentAttributes,
      });
    }
  }, [currentAttributes, getValuesAttribute, resetValueAttribute]);

  const attributes = watchAttribute('attributes');

  const handleAddAttribute = useCallback(() => {
    if (attributes.length < 2) {
      setValueAttribute(
        'attributes',
        [
          ...attributes,
          {
            title: `Nhom phan loai ${attributes.length + 1}`,
            type: null,
            specifications: [],
          },
        ],
        { shouldDirty: true },
      );
    }
  }, [attributes, setValueAttribute]);

  const handleDeleteAttributeByIndex = useCallback(
    (deleteAttributeIndex: number) => {
      setValueAttribute(
        'attributes',
        getValuesAttribute().attributes.filter(
          (attribute, attributeIndex) => attributeIndex !== deleteAttributeIndex,
        ),
        { shouldDirty: true },
      );
    },
    [getValuesAttribute, setValueAttribute],
  );

  const onSubmit: SubmitHandler<FormParams.CreateProductClassification> = useCallback(
    values => {
      if (!_.isEqual(values.attributes, currentAttributes)) {
        setAttributes(values.attributes);
        const currentSkus = getSkus();
        const skus = createProductClassificationFormUtil.getSkusFromAttributes(
          values.attributes,
          currentSkus,
        );
        setSkus(skus);
      }
      onClose();
    },
    [currentAttributes, getSkus, onClose, setAttributes, setSkus],
  );

  const handlePressClose = () => {
    onClose();
    resetValueAttribute(
      createProductClassificationFormUtil.getDefaultValues({
        attributes: currentAttributes,
      }),
    );
  };

  return (
    <>
      <Modal animationType="slide" {...modalProps}>
        <Header leftIcon={CloseIcon} onLeftPress={handlePressClose} title="Phân loại"></Header>
        <View mt={16} flex={1} bgColor="$backgroundLight100">
          <View flex={1} height={100}>
            <FlatList
              flex={1}
              numColumns={1}
              data={attributes || []}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View pt={16} bgColor="$backgroundLight100"></View>;
              }}
              renderItem={({ item, index }) => {
                return (
                  <ProductAttributeListItem
                    attribute={item as FormParams.CreateProductAttribute}
                    setValue={setValueAttribute}
                    index={index}
                    getValues={getValuesAttribute}
                    onDeleteAttribute={handleDeleteAttributeByIndex}
                    errorText={_.get(
                      errorsAttribute,
                      `attributes[${index}].specifications.message`,
                    )}
                  />
                );
              }}
              keyboardShouldPersistTaps="handled"
              ListFooterComponent={
                <View mt={24} px={16} flex={1}>
                  {attributes.length < 2 && (
                    <Button
                      variant="outline"
                      onPress={handleAddAttribute}
                      disabled={attributes.length >= 2}
                    >
                      <ButtonIcon as={Plus}></ButtonIcon>
                      <ButtonText>Thêm nhóm phân loại</ButtonText>
                    </Button>
                  )}
                  {/* <View>
                    <Text>Thêm nhóm phân loại</Text>
                  </View>
                  <View mt={8}>
                    <HStack gap={8}>
                      <Button variant="outline">
                        <ButtonText>Màu</ButtonText>
                      </Button>
                      <Button variant="outline">
                        <ButtonText>Size</ButtonText>
                      </Button>
                      <Button variant="outline" onPress={handleAddAttribute}>
                        <ButtonText>Khác</ButtonText>
                      </Button>
                    </HStack>
                  </View> */}
                </View>
              }
            ></FlatList>
          </View>
        </View>
        <ViewFooter py={16} px={16}>
          <Button onPress={handleSubmitAttribute(onSubmit)}>
            <ButtonText>Xác nhận</ButtonText>
          </Button>
        </ViewFooter>
      </Modal>
    </>
  );
};
