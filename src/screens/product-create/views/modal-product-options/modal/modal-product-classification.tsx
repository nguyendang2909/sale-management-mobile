import { Button, ButtonIcon, ButtonText, CloseIcon, FlatList, View } from '@gluestack-ui/themed';
import _ from 'lodash';
import { Plus } from 'lucide-react-native';
import { FC, useCallback, useEffect } from 'react';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, ModalProps } from 'react-native';
import { Header, ViewFooter } from 'src/components';
import { FormParams } from 'src/types';
import { createProductClassificationFormUtil } from 'src/utils/create-product-classification.util';

import { ProductOptionListItem } from './list/product-option-item';

export const ModalProductClassification: FC<
  ModalProps & {
    control: Control<FormParams.CreateProduct, any>;
    onClose: () => void;
    currentOptions: FormParams.CreateProductOption[];
    setOptions: (e: FormParams.CreateProductOption[]) => void;
    setVariants: (e: FormParams.CreateProductVariant[]) => void;
    getVariants: () => FormParams.CreateProductVariant[];
    defaultVariants?: FormParams.CreateProductVariant[];
    defaultOptions?: FormParams.CreateProductOption[];
  }
> = ({
  currentOptions,
  onClose,
  setOptions,
  setVariants,
  getVariants,
  defaultOptions,
  defaultVariants,
  ...modalProps
}) => {
  const {
    reset: resetValueOption,
    setValue: setValueOption,
    getValues: getValuesOption,
    watch: watchProductOption,
    handleSubmit: handleSubmitAttribute,
    formState: { errors: errorsProductOption },
  } = useForm<FormParams.CreateProductClassification>({
    defaultValues: {
      options: currentOptions,
    },
    resolver: createProductClassificationFormUtil.getResolver(),
  });

  useEffect(() => {
    if (!_.isEqual(currentOptions, getValuesOption().options)) {
      resetValueOption({
        options: currentOptions,
      });
    }
  }, [currentOptions, getValuesOption, resetValueOption]);

  const productOptions = watchProductOption('options');

  const handleAddOption = useCallback(() => {
    if (productOptions.length >= 2) {
      return;
    }
    setValueOption(
      'options',
      [
        ...productOptions,
        createProductClassificationFormUtil.getNewOption(
          productOptions,
          currentOptions,
          defaultOptions,
        ),
      ],
      { shouldDirty: true },
    );
  }, [currentOptions, defaultOptions, productOptions, setValueOption]);

  const handleDeleteOptionByIndex = useCallback(
    (deleteOptionIndex: number) => {
      setValueOption(
        'options',
        getValuesOption().options.filter(
          (option, optionIndex) => optionIndex !== deleteOptionIndex,
        ),
        { shouldDirty: true },
      );
    },
    [getValuesOption, setValueOption],
  );

  const onSubmit: SubmitHandler<FormParams.CreateProductClassification> = useCallback(
    values => {
      if (!_.isEqual(values.options, currentOptions)) {
        setOptions(values.options);
        const currenVariants = getVariants();
        const variants = createProductClassificationFormUtil.getVariantsFromOptions(
          values.options,
          currenVariants,
          defaultVariants,
        );
        setVariants(variants);
      }
      onClose();
    },
    [currentOptions, defaultVariants, getVariants, onClose, setOptions, setVariants],
  );

  const handlePressClose = () => {
    onClose();
    resetValueOption({ options: currentOptions });
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
              data={productOptions || []}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View pt={16} bgColor="$backgroundLight100"></View>;
              }}
              renderItem={({ item, index }) => {
                return (
                  <ProductOptionListItem
                    productOption={item as FormParams.CreateProductOption}
                    setValue={setValueOption}
                    index={index}
                    getValues={getValuesOption}
                    onDeleteProductOption={handleDeleteOptionByIndex}
                    errorText={_.get(errorsProductOption, `options[${index}].values.message`)}
                    // defaultSpecifications={
                    //   defaultOptions && defaultOptions[index]
                    //     ? defaultOptions[index].values
                    //     : undefined
                    // }
                    // currentSpecifications={
                    //   currentAttributes && currentAttributes[index]
                    //     ? currentAttributes[index].values
                    //     : undefined
                    // }
                  />
                );
              }}
              keyboardShouldPersistTaps="handled"
              ListFooterComponent={
                <View mt={24} px={16} flex={1}>
                  {productOptions.length < 2 && (
                    <Button
                      variant="outline"
                      onPress={handleAddOption}
                      disabled={productOptions.length >= 2}
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
